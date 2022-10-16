package middleware

import (
	"fmt"
	"io/ioutil"
	"suppemo-api/libs"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type MyClaim struct {
	UserId     string
	RefreshJti string
	jwt.StandardClaims
}

func createRefreshTokenString(userID string) (refreshTokenString string, err error) {
	secretBytes, err := ioutil.ReadFile("./../ssh-keys/refresh_token.rsa.pkcs8")
	if err != nil {
		return "", err
	}

	secretKey, err := jwt.ParseRSAPrivateKeyFromPEM(secretBytes)
	if err != nil {
		return "", err
	}

	if userID != "" {
		refreshJti, err := libs.StoreRefreshToken(userID)
		if err != nil {
			return "", err
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, MyClaim{
			UserId:     userID,
			RefreshJti: refreshJti,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour * 24 * 7).Unix(),
			}})

		t, err := token.SignedString(secretKey)
		if err != nil {
			return "", err
		}

		return t, err
	}

	return "", echo.ErrUnauthorized
}

func createAuthTokenString(userID string) (tokenString string, err error) {
	secretBytes, err := ioutil.ReadFile("./ssh-keys/access_token.rsa")
	if err != nil {
		return "", err
	}

	secretKey, err := jwt.ParseRSAPrivateKeyFromPEM(secretBytes)
	if err != nil {

		fmt.Println(111)
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, MyClaim{
		UserId: "10o",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 1).Unix(),
		}})

	tokenString, err = token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return
}

// func CreateNewToken(userID string) (authTokenString string, refreshTokenString string, err error) {
func CreateNewToken(userID string) (authTokenString string, err error) {
	// refreshTokenString, err = createRefreshTokenString(userID)
	// if err != nil {
	// 	return "", "", err
	// }

	authTokenString, err = createAuthTokenString(userID)
	if err != nil {
		// return "", "", err
		return "", err
	}

	return
}

func UpdateRefreshTokenExp(myClaim *MyClaim) (newTokenString, newRefreshTokenString string, err error) {
	jti := myClaim.RefreshJti
	if userID := libs.GetUserIdByRefreshToken(jti); userID != myClaim.UserId {
		return "", "", echo.ErrUnauthorized
	}

	if err != nil {
		return "", "", err
	}

	libs.DeleteRefreshToken(jti)

	newRefreshTokenString, err = createRefreshTokenString(myClaim.UserId)

	if err != nil {
		return "", "", err
	}

	newTokenString, err = createAuthTokenString(myClaim.UserId)

	if err != nil {
		return "", "", err
	}

	return
}
