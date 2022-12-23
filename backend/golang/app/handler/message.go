package handler

import (
	"fmt"
	"net/http"
	"strconv"
	middleware "suppemo-api/middleware"
	"suppemo-api/model"
	"time"

	"github.com/labstack/echo/v4"
	expo "github.com/oliveroneill/exponent-server-sdk-golang/sdk"
)

func SendMessage(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	auth, err := middleware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	message := new(model.Message)
	if err = c.Bind(&message); err != nil {
		fmt.Printf("[ERROR] %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	fmt.Println(message)
	message.UID = auth.UID

	if res, err := model.FindUser(message.UID); err != nil && res {
		fmt.Printf("[ERROR] %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if res, err := model.FindUser(message.TargetUID); err != nil && res {
		fmt.Printf("[ERROR] %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err = model.InsertMessage(message); err != nil {
		fmt.Printf("[ERROR] insert message error %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// ========== Send request to expo push notification server ==========

	pushTokens, err := model.FindPushTokens(message.TargetUID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	pushToken := []expo.ExponentPushToken{}
	for _, _token := range pushTokens {
		token, err := expo.NewExponentPushToken(_token)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		pushToken = append(pushToken, token)
	}

	client := expo.NewPushClient(nil)

	response, err := client.Publish(
		&expo.PushMessage{
			To:    pushToken,
			Body:  message.Text,
			Sound: "default",
			Title: auth.DisplayName,
		},
	)

	if err != nil {
		fmt.Printf("[ERROR] push error %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := response.ValidateResponse(); err != nil {
		fmt.Printf("[ERROR] res validate error %v", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.String(http.StatusOK, "messages send complete")
}

func GetMessages(c echo.Context) error {

	authHeader := c.Request().Header.Get("Authorization")
	user, err := middleware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	id, err := strconv.Atoi(c.QueryParam("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	msgs, err := model.FindMessages(user.UID, id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	type u struct {
		ID     string `json:"_id"`
		Name   string `json:"name"`
		Avatar string `json:"avatar"`
	}

	type talk struct {
		ID      int       `json:"_id"`
		Text    string    `json:"text"`
		Image   string    `json:"image"`
		User    u         `json:"user"`
		Created time.Time `json:"createdAt"`
	}

	type Messages struct {
		TalkWith u      `json:"talk_with"`
		Messages []talk `json:"messages"`
	}
	messages := []Messages{}
	for _, msg := range msgs {
		// 話し相手のUID
		uid := msg.UID
		talk_with, err := middleware.GetUser(uid)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		author := u{}

		if msg.UID == user.UID {
			uid = msg.TargetUID
			author.ID = user.UID
			author.Name = user.DisplayName
			author.Avatar = user.PhotoURL
		} else {
			author.ID = talk_with.UID
			author.Name = talk_with.DisplayName
			author.Avatar = talk_with.PhotoURL
		}
		// messagesにUIDの相手がいるか
		index := -1
		for i, message := range messages {
			if uid == message.TalkWith.ID {
				index = i
				break
			}
		}

		// messages に msg を追加
		if index != -1 {
			messages[index].Messages = append(messages[index].Messages, talk{
				ID:      msg.ID,
				Text:    msg.Text,
				Image:   msg.Image,
				User:    author,
				Created: msg.Created,
			})
		} else {
			messages = append(messages, Messages{
				TalkWith: u{
					ID:     uid,
					Name:   talk_with.DisplayName,
					Avatar: talk_with.PhotoURL,
				},
				Messages: []talk{
					{
						ID:      msg.ID,
						Text:    msg.Text,
						Image:   msg.Image,
						User:    author,
						Created: msg.Created,
					},
				},
			})
		}
	}

	return c.JSON(http.StatusOK, messages)
}
