package main

import (
	"log"
	"suppemo-api/handler"
	"suppemo-api/mydb"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	handler.Init(e)
	e.Static("/", "public")

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
