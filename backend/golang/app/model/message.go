package model

import (
	"suppemo-api/mydb"
	"time"
)

type Message struct {
	ID        int       `json:"id" form:"id" query:"id"`
	UID       string    `json:"uid" form:"uid" query:"uid"`
	TargetUID string    `json:"target_uid" form:"target_uid" query:"target_uid"`
	Type      string    `json:"type" form:"type" query:"type"`
	Text      string    `json:"text" form:"text" query:"text"`
	Created   time.Time `json:"created" form:"created" query:"created"`
}

func CreateMessage(uid string, target_uid string, _type string, text string) error {
	db := mydb.GetDB()

	_, err := FindUser(uid)
	if err != nil {
		return err
	}

	_, err = FindUser(target_uid)
	if err != nil {
		return err
	}

	ins, err := db.Prepare("INSERT INTO messages(uid, target_uid, type, text) VALUES(?,?,?,?)")
	if err != nil {
		return err
	}

	_, err = ins.Exec(uid, target_uid, _type, text)
	if err != nil {
		return err
	}

	return nil
}

func InsertMessage(message Message) error {
	db := mydb.GetDB()

	ins, err := db.Prepare("INSERT INTO messages(uid, target_uid, type, text) VALUES(?,?,?,?)")
	if err != nil {
		return err
	}

	_, err = ins.Exec(message.UID, message.TargetUID, message.Type, message.Text)
	if err != nil {
		return err
	}

	return nil
}

func FindMessages(uid string, target_uid string) ([]Message, error) {
	db := mydb.GetDB()

	messages := []Message{}
	rows, err := db.Query("SELECT * FROM messages WHERE uid = ? AND target_uid = ?", uid, target_uid)
	if err != nil {
		return messages, err
	}
	defer rows.Close()

	for rows.Next() {
		message := &Message{}
		err = rows.Scan(&message.UID, &message.TargetUID, &message.Type, &message.Text, &message.Created)
		if err != nil {
			return messages, nil
		}
		messages = append(messages, *message)
	}

	return messages, nil
}
