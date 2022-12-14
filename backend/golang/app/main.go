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
	err := mydb.SqlConnect()
	if err != nil {
		log.Fatal(err)
		return
	}

	if err != nil {
		log.Fatal(err)
		return
	}

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	e.POST("/init", handler.InitHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
