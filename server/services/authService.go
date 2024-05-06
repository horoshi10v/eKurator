package services

import (
	"apiKurator/config"
	"apiKurator/database"
	"apiKurator/models"
	"context"
	"encoding/json"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"net/http"
	"os"
	"time"
)

var SecretKey = os.Getenv("SECRET_KEY")
var ServerHost = os.Getenv("SERVER_HOST")

type AuthService struct{}

func (s *AuthService) GoogleLogin(c *fiber.Ctx) (string, error) {
	state := uuid.New().String()
	ctx := context.Background()
	ctx = context.WithValue(ctx, "state", state)

	// Create a new OAuth2 configuration
	conf := &oauth2.Config{
		ClientID:     config.AppConfig.GoogleLoginConfig.ClientID,
		ClientSecret: config.AppConfig.GoogleLoginConfig.ClientSecret,
		RedirectURL:  ServerHost + "/google_callback",
		Scopes:       config.AppConfig.GoogleLoginConfig.Scopes,
		Endpoint:     config.AppConfig.GoogleLoginConfig.Endpoint,
	}

	url := conf.AuthCodeURL(state)

	// Set the "state" cookie
	cookie := new(fiber.Cookie)
	cookie.Name = "state"
	cookie.Value = state
	cookie.Expires = time.Now().Add(time.Hour * 1)
	c.Cookie(cookie)

	return url, nil
}

func (s *AuthService) GoogleLogout() *fiber.Cookie {
	cookie := new(fiber.Cookie)
	cookie.Name = "jwt"
	cookie.Value = ""
	cookie.Expires = time.Now().Add(-time.Hour)
	cookie.HTTPOnly = true
	return cookie
}

func (s *AuthService) GoogleCallback(ctx *fiber.Ctx, code string) (string, *fiber.Cookie, error) {
	storedState := ctx.Cookies("state")
	if storedState == "" {
		return "", nil, errors.New("Failed to retrieve stored state")
	}
	state := ctx.Query("state")
	if state != storedState {
		return "", nil, errors.New("States don't Match!!")
	}

	conf := &oauth2.Config{
		ClientID:     config.AppConfig.GoogleLoginConfig.ClientID,
		ClientSecret: config.AppConfig.GoogleLoginConfig.ClientSecret,
		RedirectURL:  ServerHost + "/google_callback",
		Scopes:       config.AppConfig.GoogleLoginConfig.Scopes,
		Endpoint:     config.AppConfig.GoogleLoginConfig.Endpoint,
	}

	// Exchange the authorization code for an access token
	gtoken, err := conf.Exchange(context.Background(), code)
	if err != nil {
		if e, ok := err.(*oauth2.RetrieveError); ok {
			ctx.Status(fiber.StatusBadRequest)
			return "", nil, fiber.NewError(fiber.StatusBadRequest, e.Error())
		}
		return "", nil, errors.New("Code-Token Exchange Failed")
	}

	// Retrieve the user's information from Google
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + gtoken.AccessToken)
	if err != nil {
		return "", nil, errors.New("User Data Fetch Failed")
	}

	var user models.User
	err = json.NewDecoder(resp.Body).Decode(&user)

	// Create a JWT
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, &jwt.RegisteredClaims{
		Issuer:    string(user.ID),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 1)),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		return "", nil, errors.New("can not sign")
	}

	// Set a cookie with the JWT
	cookie := new(fiber.Cookie)
	cookie.Name = "jwt"
	cookie.Value = token
	cookie.Expires = time.Now().Add(time.Hour * 1)
	cookie.HTTPOnly = true

	// Save the user to the database
	database.DB.Create(&user)

	var clientPort = os.Getenv("CLIENT_PORT")
	return clientPort + "/user", cookie, nil
}
