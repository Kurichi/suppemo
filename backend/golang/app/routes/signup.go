package routes

import (
	"net/http"
	"suppemo-api/model"

	"github.com/labstack/echo"
)

func SignUp(c echo.Context) error {
	user := new(model.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	if user.Name == "" || user.Email == "" || user.Password == "" {
		return &echo.HTTPError{
			Code:    http.StatusBadRequest,
			Message: "invalid form",
		}
	}

	if u := model.FindUser(user); u.Email == user.Email {
		return &echo.HTTPError{
			Code:    http.StatusBadRequest,
			Message: "invalid ID or Email",
		}
	}

	model.CreateUser(user)
	user.Password = ""

	return c.JSON(http.StatusCreated, user)
}
