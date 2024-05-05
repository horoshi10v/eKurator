package test

import (
	"apiKurator/controllers"
	"github.com/gofiber/fiber/v2"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAddUser(t *testing.T) {
	app := fiber.New()
	app.Post("/user", controllers.UserControllerImpl{}.AddUser)

	tests := []struct {
		name    string
		payload string
		wantErr bool
	}{
		{
			name:    "Invalid user data",
			payload: `{"name":"","email":"john@example.com"}`,
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPost, "/user", nil)
			req.Header.Set("Content-Type", "application/json")
			//req.SetBody([]byte(tt.payload))

			resp, _ := app.Test(req)
			if resp.StatusCode != fiber.StatusOK && !tt.wantErr {
				t.Errorf("Expected status code %d but got %d", fiber.StatusOK, resp.StatusCode)
			}
			if resp.StatusCode == fiber.StatusOK && tt.wantErr {
				t.Errorf("Expected an error but got status code %d", resp.StatusCode)
			}
		})
	}
}

func TestDeleteUser(t *testing.T) {
	app := fiber.New()
	app.Delete("/user/:id", controllers.UserControllerImpl{}.DeleteUser)

	tests := []struct {
		name    string
		userID  string
		wantErr bool
	}{
		{
			name:    "Nonexistent user ID",
			userID:  "nonexistent-user-id",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodDelete, "/user/"+tt.userID, nil)

			resp, _ := app.Test(req)
			if resp.StatusCode != fiber.StatusOK && !tt.wantErr {
				t.Errorf("Expected status code %d but got %d", fiber.StatusOK, resp.StatusCode)
			}
			if resp.StatusCode == fiber.StatusOK && tt.wantErr {
				t.Errorf("Expected an error but got status code %d", resp.StatusCode)
			}
		})
	}
}

func TestGetUser(t *testing.T) {
	app := fiber.New()
	app.Get("/user/:id", controllers.UserControllerImpl{}.GetUser)

	tests := []struct {
		name    string
		userID  string
		wantErr bool
	}{
		{
			name:    "Nonexistent user ID",
			userID:  "nonexistent-user-id",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/user/"+tt.userID, nil)

			resp, _ := app.Test(req)
			if resp.StatusCode != fiber.StatusOK && !tt.wantErr {
				t.Errorf("Expected status code %d but got %d", fiber.StatusOK, resp.StatusCode)
			}
			if resp.StatusCode == fiber.StatusOK && tt.wantErr {
				t.Errorf("Expected an error but got status code %d", resp.StatusCode)
			}
		})
	}
}

func TestGetUsers(t *testing.T) {
	app := fiber.New()
	app.Get("/users", controllers.UserControllerImpl{}.GetUsers)

	tests := []struct {
		name    string
		wantErr bool
	}{
		{
			name:    "Valid request",
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/users", nil)

			resp, _ := app.Test(req)
			if resp.StatusCode != fiber.StatusOK && !tt.wantErr {
				t.Errorf("Expected status code %d but got %d", fiber.StatusOK, resp.StatusCode)
			}
			if resp.StatusCode == fiber.StatusOK && tt.wantErr {
				t.Errorf("Expected an error but got status code %d", resp.StatusCode)
			}
		})
	}
}

func TestUpdateUser(t *testing.T) {
	app := fiber.New()
	app.Put("/user/:id", controllers.UserControllerImpl{}.UpdateUser)

	tests := []struct {
		name    string
		userID  string
		payload string
		wantErr bool
	}{
		{
			name:    "Existing user ID with invalid payload",
			userID:  "existing-user-id",
			payload: `{"name":"","email":"john@example.com"}`,
			wantErr: true,
		},
		{
			name:    "Nonexistent user ID",
			userID:  "nonexistent-user-id",
			payload: `{"name":"John Doe","email":"john@example.com"}`,
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPut, "/user/"+tt.userID, nil)
			req.Header.Set("Content-Type", "application/json")

			resp, _ := app.Test(req)
			if resp.StatusCode != fiber.StatusOK && !tt.wantErr {
				t.Errorf("Expected status code %d but got %d", fiber.StatusOK, resp.StatusCode)
			}
			if resp.StatusCode == fiber.StatusOK && tt.wantErr {
				t.Errorf("Expected an error but got status code %d", resp.StatusCode)
			}
		})
	}
}
