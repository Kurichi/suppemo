package handler

import (
	"context"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"google.golang.org/api/idtoken"
)

type RedirectRequestBody struct {
	ClientId     string `json:"clientId" form:"clientId"`
	Credential   string `json:"credential" form:"credential"`
	Select_by    string `json:"select_by" form:"select_by"`
	G_csrf_token string `json:"g_csrf_token" form:"g_csrf_token"`
}

func Redirect(c echo.Context) error {
	req := new(RedirectRequestBody)
	if err := c.Bind(req); err != nil {
		return err

	}

	cookie, err := c.Cookie("g_csrf_token")
	if err != nil {
		return err
	}
	if req.G_csrf_token != cookie.Value {
		return echo.ErrCookieNotFound
	}

	// var token string
	const googleClientId = "207821823445-gpg81prl3lj8nbbevv6cjf7in5qomq0q.apps.googleusercontent.com" // from credentials in the Google dev console

	// tokenValidator, err := idtoken.NewValidator(context.Background())
	// if err != nil {
	// 	return err
	// }

	payload, err := idtoken.Validate(context.Background(), req.Credential, googleClientId)
	// _, err = idtoken.Validate(context.Background(), req.Credential, googleClientId)
	if err != nil {
		return err
	}

	fmt.Println(payload.Claims)
	email := payload.Claims["email"]
	name := payload.Claims["name"]

	fmt.Println(email)
	fmt.Println(name)

	return c.String(http.StatusOK, "hello world!")
}
