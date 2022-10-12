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

	if user.ID == "" || user.Name == "" || user.Email || user.Password == "" {
		return &echo.HTTPError{
			Code:	http.StatusBadRequest,
			Message: "invalid form",
		}
	}

	if u := model.FindUser
}
