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

	// Routes
	e.POST("/login", handler.Login)
	e.POST("/signup", handler.SignUp)

	// Auth Config
	// authPublicBytes, err := ioutil.ReadFile("./ssh-keys/access_token.rsa.pub.pkcs8")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// authPublicKey, err := jwt.ParseRSAPublicKeyFromPEM(authPublicBytes)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// authSecretBytes, err := ioutil.ReadFile("./ssh-keys/access_token.rsa.pkcs8")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// authSecretKey, err := jwt.ParseRSAPrivateKeyFromPEM(authSecretBytes)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// r1Config := middleware.JWTConfig{
	// 	SigningKey: authSecretKey,
	// 	ParseTokenFunc: func(auth string, c echo.Context) (interface{}, error) {
	// 		keyFunc := func(token *jwt.Token) (interface{}, error) {
	// 			if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
	// 				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	// 			}
	// 			return authSecretKey, nil
	// 		}

	// 		token, err := jwt.Parse(auth, keyFunc)
	// 		if err != nil {
	// 			return nil, err
	// 		}
	// 		if !token.Valid {
	// 			return nil, errors.New("invalid token")
	// 		}
	// 		return token, nil
	// 	},
	// }

	// r1 := e.Group("/restricted")
	// r1.Use(middleware.JWTWithConfig(r1Config))
	// r1.GET("", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Hello World!!!")
	// })

	// // Reauth Config
	// refreshSecretBytes, err := ioutil.ReadFile("./ssh-keys/refresh_token.rsa.pub.pkcs8")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// refreshSecretKey, err := jwt.ParseRSAPublicKeyFromPEM(refreshSecretBytes)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// r2Config := middleware.JWTConfig{
	// 	SigningKey: refreshSecretKey,
	// 	ParseTokenFunc: func(auth string, c echo.Context) (interface{}, error) {
	// 		keyFunc := func(token *jwt.Token) (interface{}, error) {
	// 			if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
	// 				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	// 			}
	// 			return refreshSecretKey, nil
	// 		}

	// 		token, err := jwt.Parse(auth, keyFunc)
	// 		if err != nil {
	// 			return nil, err
	// 		}
	// 		if !token.Valid {
	// 			return nil, errors.New("invalid token")
	// 		}
	// 		return token, nil
	// 	},
	// }

	// r2 := e.Group("/reauth")
	// r2.Use(middleware.JWTWithConfig(r2Config))

	// Start server
	e.Logger.Fatal(e.Start(":8080"))

}
