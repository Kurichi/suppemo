package model

import (
	"fmt"
	"io"
	"math/rand"
	"suppemo-api/mydb"
	"time"

	"github.com/oklog/ulid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

var ulidGenerator io.Reader = ulid.Monotonic(rand.New(rand.NewSource(time.Now().UnixNano())), 0)

func CreateUser(u *User) {
	myulid := ulid.MustNew(ulid.Timestamp(time.Now()), ulidGenerator).String()

	hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), 10)

	db := mydb.GetDB()

	ins, err := db.Prepare("INSERT INTO users(id,name,email,password) VALUES(?,?,?,?)")
	if err != nil {
		fmt.Println(err)
	}

	_, err = ins.Exec(myulid, u.Name, u.Email, string(hashed))
	if err != nil {
		fmt.Println(err)
	}

}

func FindUser(u *User) User {
	db := mydb.GetDB()

	user := &User{}
	db.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", u.Email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Password)
	fmt.Println(*user)

	return *user
}
