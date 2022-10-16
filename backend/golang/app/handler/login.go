package handler

import (
	"fmt"
	"log"
	"net/http"
	"suppemo-api/middleware"
	"suppemo-api/model"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func Login(c echo.Context) error {
	user := new(model.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	fmt.Println(user)

	if user.Email == "" || user.Password == "" {
		return &echo.HTTPError{
			Code:    http.StatusBadRequest,
			Message: "invalid form",
		}
	}

	u := model.FindUser(user)
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(user.Password)); err != nil {
		return &echo.HTTPError{
			Code:    http.StatusBadRequest,
			Message: "invalid Email or Password",
		}
	}

	authTokenString, err := middleware.CreateNewToken(user.ID)
	if err != nil {
		log.Fatal(err)
		return echo.ErrUnauthorized
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": authTokenString,
	})
}
