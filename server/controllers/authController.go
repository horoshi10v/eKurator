package controllers

import (
	"apiKurator/services"
	"github.com/gofiber/fiber/v2"
)

type AuthControllerImpl struct {
	authService *services.AuthService
}

func (a *AuthControllerImpl) GoogleLogin(c *fiber.Ctx) error {
	url, err := a.authService.GoogleLogin(c)
	if err != nil {
		return err
	}
	c.Status(fiber.StatusSeeOther)
	err = c.Redirect(url)
	if err != nil {
		return err
	}
	return c.JSON(url)
}

func (a *AuthControllerImpl) GoogleLogout(c *fiber.Ctx) error {
	cookie := a.authService.GoogleLogout()
	c.Cookie(cookie) // removed the & operator
	return c.JSON(fiber.Map{
		"message": "logout success",
	})
}

func (a *AuthControllerImpl) GoogleCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	redirectUrl, cookie, err := a.authService.GoogleCallback(c, code) // pass c as the first argument
	if err != nil {
		return c.SendString(err.Error())
	}
	c.Cookie(cookie)
	return c.Redirect(redirectUrl)
}
