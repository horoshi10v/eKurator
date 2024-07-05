package routes

import (
	"apiKurator/internal/controllers"
	"apiKurator/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	authController := &controllers.AuthControllerImpl{}

	app.Get("/google_login", authController.GoogleLogin)
	app.Get("/google_callback", authController.GoogleCallback)
	app.Get("/google_logout", authController.GoogleLogout)

	userController := &controllers.UserControllerImpl{}

	app.Get("/user", middleware.AuthMiddleware, userController.User)
	app.Get("/users", userController.GetUsers)
	app.Get("user/:id", userController.GetUser)
	app.Put("user/:id/update", userController.UpdateUser)
	app.Delete("/user/:id", userController.DeleteUser)
	app.Post("/addUser", userController.AddUser)
}
