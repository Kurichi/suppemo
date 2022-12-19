package model

import (
	"suppemo-api/mydb"
	"time"
)

type User struct {
	UID     string    `json:"uid" form:"uid" query:"uid"`
	Name    string    `json:"name" form:"name" query:"name"`
	Created time.Time `json:"created" form:"created" query:"created"`
	Updated time.Time `json:"updated" form:"updated" query:"updated"`
}

func CreateUser(uid string, name string) error {
	db := mydb.GetDB()

	ins, err := db.Prepare("INSERT IGNORE INTO users(id,name) VALUES(?,?)")
	if err != nil {
		return err
	}

	_, err = ins.Exec(uid, name)
	if err != nil {
		return err
	}

	return nil
}

func FindUser(uid string) (User, error) {
	db := mydb.GetDB()

	user := &User{}
	err := db.QueryRow("SELECT * FROM users WHERE uid = ?", uid).
		Scan(&user.UID, &user.Name, &user.Created, &user.Updated)
	if err != nil {
		return *user, err
	}

	return *user, nil
}
