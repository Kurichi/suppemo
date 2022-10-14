package main

import (
	"log"
	"suppemo-api/mydb"
	"suppemo-api/routes"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	if err := mydb.SqlConnect(); err != nil {
		log.Fatal(err)
		return
	}
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
