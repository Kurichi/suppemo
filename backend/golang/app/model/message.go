package model

import (
	"fmt"
	"suppemo-api/mydb"
	"time"
)

type Message struct {
	ID        int       `json:"id" form:"id" query:"id"`
	UID       string    `json:"uid" form:"uid" query:"uid"`
	TargetUID string    `json:"to" form:"to" query:"to"`
	Text      string    `json:"text" form:"text" query:"text"`
	Image     string    `json:"image" form:"image" query:"image"`
	Created   time.Time `json:"created" form:"created" query:"created"`
}

func CreateMessage(uid string, target_uid string, image string, text string) error {
	db := mydb.GetDB()

	stmt, err := db.Prepare("INSERT INTO messages(uid, target_uid, type, text) VALUES(?,?,?,?)")
	if err != nil {
		fmt.Printf("[ERROR] message prepare error: %v", err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(uid, target_uid, image, text)
	if err != nil {
		fmt.Printf("[ERROR] message exec error: %v", err)
		return err
	}

	return nil
}

func InsertMessage(message *Message) error {
	db := mydb.GetDB()

	stmt, err := db.Prepare("INSERT INTO messages(uid, target_uid, type, text) VALUES(?,?,?,?)")
	if err != nil {
		fmt.Printf("[ERROR] message prepare error: %v", err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(message.UID, message.TargetUID, message.Image, message.Text)
	if err != nil {
		fmt.Printf("[ERROR] message exec error: %v", err)
		return err
	}

	return nil
}

func FindMessages(uid string, id int) ([]Message, error) {
	db := mydb.GetDB()

	stmt, err := db.Prepare("SELECT * FROM messages WHERE id > ? AND (uid = ? OR target_uid = ?)")
	if err != nil {
		fmt.Printf("[ERROR] message prepare error: %v", err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(id, uid, uid)
	if err != nil {
		fmt.Printf("[ERROR] message query error: %v", err)
		return nil, err
	}
	defer rows.Close()

	messages := []Message{}
	for rows.Next() {
		message := &Message{}
		err = rows.Scan(&message.ID, &message.UID, &message.TargetUID, &message.Image, &message.Text, &message.Created)
		if err != nil {
			fmt.Printf("[ERROR] message scan error: %v", err)
			return nil, err
		}
		messages = append(messages, *message)
	}

	return messages, nil
}
