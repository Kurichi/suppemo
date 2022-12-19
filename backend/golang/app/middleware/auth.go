package middleware

import (
	"context"
	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func Auth(authHeader string) (*auth.UserRecord, error) {
	opt := option.WithCredentialsFile("service-account-file.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(context.Background())
	if err != nil {
		return nil, err
	}

	idToken := strings.Replace(authHeader, "Bearer ", "", 1)

	token, err := client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		return nil, err
	}

	return client.GetUser(context.Background(), token.UID)
}
