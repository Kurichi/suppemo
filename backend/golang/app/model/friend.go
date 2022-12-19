package model

import (
	"suppemo-api/mydb"
	"time"
)

type Friend struct {
	ID        int       `json:"id" form:"id" query:"id"`
	UID       string    `json:"uid" form:"uid" query:"uid"`
	FriendUID string    `json:"friend_uid" form:"friend_uid" query:"friend_uid"`
	Created   time.Time `json:"created" form:"created" query:"created"`
}

func CreateFriend(u *User) error {
	db := mydb.GetDB()

	ins, err := db.Prepare("INSERT INTO users(id,name) VALUES(?,?)")
	if err != nil {
		return err
	}

	_, err = ins.Exec(u.UID, u.Name)
	if err != nil {
		return err
	}

	return nil
}

func FindFriends(uid string) ([]Friend, error) {
	db := mydb.GetDB()

	friends := []Friend{}
	rows, err := db.Query("SELECT * FROM friends WHERE uid = ?", uid)
	if err != nil {
		return friends, err
	}
	defer rows.Close()

	for rows.Next() {
		friend := &Friend{}
		err := rows.Scan(&friend.ID, &friend.UID, &friend.FriendUID, &friend.Created)
		if err != nil {
			return friends, err
		}
		friends = append(friends, *friend)
	}

	return friends, nil
}
