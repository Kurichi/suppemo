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

	pushToken := &model.PushToken{}
	c.Bind(pushToken)

	return c.JSON(http.StatusOK, *user)
}
