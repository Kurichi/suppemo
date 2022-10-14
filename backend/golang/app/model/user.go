package model

import "suppemo-api/mydb"

type User struct {
	ID       string
	Name     string
	Email    string
	Password string
}

func CreateUser(u *User) {
	db := mydb.SqlConnect()
	defer db.Close()

	db.Query("INSERT INTO users values ")
}

func FindUser(u *User) User {
	db := mydb.SqlConnect()
	defer db.Close()

	user := &User{}
	db.QueryRow("SELECT * FROM users WHERE id = ? OR email = ?", u.ID, u.Email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Password)

	return *user
}
