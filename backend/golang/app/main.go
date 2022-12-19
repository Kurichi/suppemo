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

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	e.POST("/", handler.InitHandler)
	e.POST("/chat", handler.SendMessage)
	e.GET("/chat", handler.GetMessages)
	e.POST("/friend", handler.AddFriend)
	e.GET("/friend", handler.GetFriends)

	e.Logger.Fatal(e.Start(":8080"))
}
