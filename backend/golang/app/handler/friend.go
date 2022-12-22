package handler

import (
	"net/http"
	middlware "suppemo-api/middleware"
	"suppemo-api/model"

	"github.com/labstack/echo/v4"
)

type requestBody struct {
	UID string `json:"uid" query:"uid" form:"uid"`
}

func AddFriend(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	user, err := middlware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	reqBody := new(requestBody)
	if err := c.Bind(reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if user.UID == reqBody.UID {
		return c.String(http.StatusBadRequest, "you can't add friend yourself")
	}

	if err := model.CreateFriend(user.UID, reqBody.UID); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.String(http.StatusOK, "add friend complete")
}

func GetFriends(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	user, err := middlware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	friends, err := model.FindFriends(user.UID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	type response struct {
		FriendUID []string `json:"friend_uid"`
	}

	return c.JSON(http.StatusOK, &response{friends})
}