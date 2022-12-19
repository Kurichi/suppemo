package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	middleware "suppemo-api/middleware"
	"suppemo-api/model"

	"github.com/labstack/echo/v4"
)

func SendMessage(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	auth, err := middleware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	message := model.Message{}
	err = c.Bind(&message)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	message.UID = auth.UID

	user, err := model.FindUser(message.UID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	_, err = model.FindUser(message.TargetUID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	// ========== Send request to expo push notification server ==========
	push_tokens, err := model.FindPushTokens(message.TargetUID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	type RequestBody struct {
		to    string
		title string
		body  string
	}

	url := "https://exp.host/--/api/v2/push/send"
	body := []RequestBody{}
	for _, token := range push_tokens {
		body = append(body, RequestBody{
			to:    token.Token,
			title: user.Name,
			body:  message.Text,
		})
	}
	// struct to json string
	body_json, err := json.Marshal(body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	// create request
	req, err := http.NewRequest(
		"POST",
		url,
		bytes.NewBuffer([]byte(body_json)),
	)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	req.Header.Set("Content-Type", "application/json")

	// send http request
	client := &http.Client{}
	_, err = client.Do(req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = model.InsertMessage(message)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.String(http.StatusOK, "messages send complete")
}

func GetMessages(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	auth, err := middleware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	type targetUIDs struct {
		TargetUIDs []string `json:"target_uid"`
	}
	targets := &targetUIDs{}
	c.Bind(targets)

	type messages struct {
		target_uid string          `json:"target_uid"`
		messages   []model.Message `json:"messages"`
	}
	msgs := []messages{}
	for _, targetUID := range targets.TargetUIDs {
		message, err := model.FindMessages(auth.UID, targetUID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		msgs = append(msgs, messages{
			target_uid: targetUID,
			messages:   message,
		})
	}

	return c.JSON(http.StatusOK, model.Message{})
}
