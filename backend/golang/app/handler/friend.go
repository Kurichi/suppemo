package handler

import (
	"net/http"
	middlware "suppemo-api/middleware"

	"github.com/labstack/echo/v4"
)

func AddFriend(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	_, err := middlware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return nil
}

func GetFriends(c echo.Context) error {

	return nil
}
