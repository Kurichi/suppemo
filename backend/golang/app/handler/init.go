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

	type bodyType struct {
		name       string `json:"name"`
		push_token string `json:"push_token"`
	}
	body := &bodyType{}
	err = c.Bind(body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	// Create userif not exists
	err = model.CreateUser(user.UID, body.name)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if body.push_token == "" {
		return c.String(http.StatusOK, "not push")
	}
	model.CreatePushToken(user.UID, body.push_token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.String(http.StatusOK, "push")
}
