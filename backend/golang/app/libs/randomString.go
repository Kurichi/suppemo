package libs

import (
	"crypto/rand"
	"encoding/base64"
	"suppemo-api/mydb"
)

func GenerateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}

	return b, nil
}

func GetUserIdByRefreshToken(jti string) (userID string) {
	db := mydb.GetDB()
	defer db.Close()

	if err := db.QueryRow("SELECT id FROM refreshtokens WHERE refresh_token = ?", jti).Scan(&userID); err != nil {
		return ""
	}

	return
}

func GenerateRandomString(s int) (string, error) {
	b, err := GenerateRandomBytes(s)
	return base64.URLEncoding.EncodeToString(b), err
}

func StoreRefreshToken(userID string) (jti string, err error) {
	jti, err = GenerateRandomString(32)
	if err != nil {
		return jti, err
	}

	for GetUserIdByRefreshToken(jti) != "" {
		jti, err = GenerateRandomString(32)
		if err != nil {
			return jti, err
		}
	}

	db := mydb.GetDB()
	defer db.Close()

	ins, err := db.Prepare("INSERT INTO refresh_tokens(id, refresh_token) VALUES(?,?)")
	if err != nil {
		return "", err
	}
	_, err = ins.Exec(userID, jti)

	return jti, err
}

func DeleteRefreshToken(jti string) error {
	db := mydb.GetDB()
	defer db.Close()

	del, err := db.Prepare("DELETE FROM refresh_tokens WHERE refresh_token=?")
	if err != nil {
		return err
	}

	_, err = del.Exec(jti)
	if err != nil {
		return err
	}

	return nil
}
