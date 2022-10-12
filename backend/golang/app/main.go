package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"routes/login"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
)

func main() {
	fmt.Println(login.HelloWorld())

	db := sqlConnect()
	defer db.Close()

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "HelloWorld!!!!")
	})
	e.Logger.Fatal(e.Start(":8080"))
}

func sqlConnect() (database *sql.DB) {
	err := godotenv.Load(fmt.Sprintf("%s.env", os.Getenv("GO_ENV")))
	if err != nil {
		log.Fatal(err)
	}
	DBMS := os.Getenv("DBMS")
	USER := os.Getenv("DB_USER")
	PASS := os.Getenv("DB_PASS")
	HOST := os.Getenv("DB_HOST")
	PORT := os.Getenv("DB_PORT")
	DBNAME := os.Getenv("DB_NAME")

	CONNECT := USER + ":" + PASS + "@tcp(" + HOST + ":" + PORT + ")/" + DBNAME + "?charset=utf8mb4&parseTime=true&loc=Asia%2FTokyo"

	count := 0
	db, err := sql.Open(DBMS, CONNECT)
	if err != nil {
		for {
			if err == nil {
				fmt.Println("")
				break
			}
			fmt.Print(".")
			time.Sleep(time.Second)
			count++
			if count > 60 {
				fmt.Println("")
				fmt.Println("DB接続失敗")
				panic(err)
			}
			db, err = sql.Open(DBMS, CONNECT)
		}
	}

	fmt.Println("DB接続成功")

	return db
}
