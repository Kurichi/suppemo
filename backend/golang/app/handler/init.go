package handler

import (
	"net/http"
	middlware "suppemo-api/middleware"
	"suppemo-api/model"

	"github.com/labstack/echo/v4"
)

func InitHandler(c echo.Context) error {
	authHeader := c.Request().Header.Get("Authorization")
	user, err := middlware.Auth(authHeader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	// Create user if not exists
	name := c.Param("name")
	err = model.CreateUser(user.UID, name)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	pushToken := c.Param("push_token")
	if pushToken == "" {
		return c.String(http.StatusOK, "not push")
	}
	model.CreatePushToken(user.UID, pushToken)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.String(http.StatusOK, "push")
}
