package model

import (
	"suppemo-api/mydb"
	"time"
)

type PushToken struct {
	ID      int       `json:"id" form:"id" query:"id"`
	UID     string    `json:"uid" form:"uid" query:"uid"`
	Token   string    `json:"push_token" form:"push_token" query:"push_token"`
	Created time.Time `json:"created_at" form:"created_at" query:"created_at"`
}

func CreatePushToken(uid string, token string) error {
	db := mydb.GetDB()

	ins, err := db.Prepare("INSERT INTO push_tokens(uid,token) VALUES(?,?)")
	if err != nil {
		return err
	}

	_, err = ins.Exec(uid, token)
	if err != nil {
		return err
	}

	return nil
}

func FindPushTokens(uid string) ([]PushToken, error) {
	db := mydb.GetDB()

	tokens := []PushToken{}
	rows, err := db.Query("SELECT * FROM push_tokens WHERE uid = ?", uid)
	if err != nil {
		return tokens, err
	}
	defer rows.Close()

	for rows.Next() {
		token := &PushToken{}
		err = rows.Scan(&token.ID, &token.UID, &token.Token, &token.Created)
		if err != nil {
			return tokens, err
		}
		tokens = append(tokens, *token)
	}

	return tokens, nil
}
