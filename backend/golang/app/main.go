package main

import (
	"suppemo-api/routes"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	// Routes
	e.POST("/login", routes.Login)
	e.POST("/signup", routes.SignUp)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))

}
