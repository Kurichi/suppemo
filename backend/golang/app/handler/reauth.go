package handler

import (
	"net/http"
	"suppemo-api/middleware"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

func ReAuth(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*middleware.MyClaim)

	tokenString, refreshTokenString, err := middleware.UpdateRefreshTokenExp(claims)
	if err != nil {
		return c.JSON(http.StatusOK, map[string]string{
			"token":        tokenString,
			"refreshToken": refreshTokenString,
		})
	}

	return echo.ErrUnauthorized
}
