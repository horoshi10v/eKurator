package controllers

import (
	"apiKurator/services"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"os"
)

var SecretKey = os.Getenv("SECRET_KEY")

type UserControllerImpl struct {
	userService *services.UserServiceImpl
}

func (u *UserControllerImpl) User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.NewParser().ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}
	claims := token.Claims.(*jwt.RegisteredClaims)
	user, err := u.userService.GetUserByID(claims.Issuer)
	if err != nil {
		return err
	}
	return c.JSON(user)
}

func (u *UserControllerImpl) AddUser(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	user, err := u.userService.CreateUser(data)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{
		"message": "User created successfully",
		"user":    user,
	})
}

func (u *UserControllerImpl) GetUsers(c *fiber.Ctx) error {
	role := c.Query("role")
	users, err := u.userService.GetUserByRole(role)
	if err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).JSON(users)
}

func (u *UserControllerImpl) GetUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	user, err := u.userService.GetUserByID(userID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}
	return c.JSON(user)
}

func (u *UserControllerImpl) UpdateUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	var data map[string]interface{}
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	user, err := u.userService.UpdateUser(userID, data)
	if err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).JSON(user)
}

func (u *UserControllerImpl) DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	err := u.userService.DeleteUser(id)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Failed to delete user", "data": nil})
	}
	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User deleted"})
}
