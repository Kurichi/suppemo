package routes

import (
	"net/http"
	"suppemo-api/model"

	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

func Login(c echo.Context) error {
	user := new(model.User)
	if err := c.Bind(user); err != nil {
		return err
	}

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

	u.Password = ""

	return c.JSON(http.StatusCreated, u)
}
