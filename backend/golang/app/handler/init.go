package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"google.golang.org/api/option"
)

func InitHandler(c echo.Context) error {
	opt := option.WithCredentialsFile("service-account-file.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatal(err)
		return err
	}

	client, err := app.Auth(context.Background())
	if err != nil {
		log.Fatal(err)
		return err
	}

	authHeader := c.Request().Header.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)

	token, err := client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		u := fmt.Sprintf("error verifying ID token: %v\n", err)
		return c.JSON(http.StatusBadRequest, u)
	}

	user, err := client.GetUser(context.Background(), token.UID)
	fmt.Println(user)

	return nil
}
