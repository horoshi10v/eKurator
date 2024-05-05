package services

import (
	"apiKurator/config"
	"apiKurator/database"
	"apiKurator/models"
	"context"
	"encoding/json"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"net/http"
	"os"
	"time"
)

var SecretKey = os.Getenv("SECRET_KEY")

type AuthService struct{}

func (s *AuthService) GoogleLogin() (string, error) {
	url := config.AppConfig.GoogleLoginConfig.AuthCodeURL("randomstate")
	return url, nil
}

func (s *AuthService) GoogleLogout() fiber.Cookie {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	return cookie
}

func (s *AuthService) GoogleCallback(code string, state string) (string, fiber.Cookie, error) {
	var clientPort = os.Getenv("CLIENT_PORT")
	if state != "randomstate" {
		return "", fiber.Cookie{}, errors.New("States don't Match!!")
	}

	googlecon := config.GoogleConfig()

	gtoken, err := googlecon.Exchange(context.Background(), code)
	if err != nil {
		return "", fiber.Cookie{}, errors.New("Code-Token Exchange Failed")
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + gtoken.AccessToken)
	if err != nil {
		return "", fiber.Cookie{}, errors.New("User Data Fetch Failed")
	}

	var user models.User
	err = json.NewDecoder(resp.Body).Decode(&user)

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    string(user.ID),
		ExpiresAt: time.Now().Add(time.Hour * 1).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		return "", fiber.Cookie{}, errors.New("can not sign")
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 1),
		HTTPOnly: true,
	}

	database.DB.Create(&user)

	return clientPort + "/user", cookie, nil
}
