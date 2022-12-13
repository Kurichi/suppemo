package handler

import (
	"fmt"
	"net/http"
	"suppemo-api/middleware"

	jwtv3 "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

func ReAuth(c echo.Context) error {
	user := c.Get("user").(*jwtv3.Token)
	fmt.Println(user)
	claims := user.Claims.(*middleware.MyClaim)

	tokenString, refreshTokenString, err := middleware.UpdateRefreshTokenExp(claims)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token":        tokenString,
		"refreshToken": refreshTokenString,
	})

}
