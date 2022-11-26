package libs

import (
	"crypto/rsa"
	"io/ioutil"

	"github.com/golang-jwt/jwt"
)

func LoadRSAPublicKey(filePath string) (publicKey *rsa.PublicKey, err error) {
	publicKeyBytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	publicKey, err = jwt.ParseRSAPublicKeyFromPEM(publicKeyBytes)
	if err != nil {
		return nil, err
	}

	return
}

func LoadRSAPrivateKey(filePath string) (privateKey *rsa.PrivateKey, err error) {
	privateKeyBytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	privateKey, err = jwt.ParseRSAPrivateKeyFromPEM(privateKeyBytes)
	if err != nil {
		return nil, err
	}

	return
}
