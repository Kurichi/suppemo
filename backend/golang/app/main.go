package main

import (
	"log"
	"suppemo-api/handler"
	auth "suppemo-api/middleware"
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

	if err := auth.Init(); err != nil {
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
