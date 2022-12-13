package handler

import (
	"log"
	"net/http"
	"suppemo-api/libs"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init(e *echo.Echo) error {
	// Public Routes
	e.POST("/login", Login)
	e.POST("/signup", SignUp)
	e.POST("/redirect", Redirect)

	// Auth Config
	authPublicKey, err := libs.LoadRSAPublicKey("./ssh-keys/access_token_public.key")
	if err != nil {
		return nil
	}

	r1Config, err := libs.Config(authPublicKey)
	if err != nil {
		return nil
	}

	r1 := e.Group("/restricted")
	r1.Use(middleware.JWTWithConfig(r1Config))
	r1.GET("", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!!!")
	})

	// Reauth Config
	refreshPublicKey, err := libs.LoadRSAPublicKey("./ssh-keys/refresh_token_public.key")
	if err != nil {
		log.Fatal(err)
	}

	r2Config, err := libs.Config(refreshPublicKey)
	if err != nil {
		return err
	}

	r2 := e.Group("/reauth")
	r2.Use(middleware.JWTWithConfig(r2Config))
	r2.GET("", ReAuth)

	return nil
}
