package services

import (
	"apiKurator/database"
	"apiKurator/models"
	"github.com/google/uuid"
)

type UserServiceImpl struct{}

func (u *UserServiceImpl) GetUserByID(id string) (*models.User, error) {
	var user models.User
	if err := database.DB.Find(&user, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserServiceImpl) GetUserByRole(role string) ([]models.User, error) {
	var users []models.User
	switch role {
	case "curator":
		database.DB.Where("role = ?", "куратор").Find(&users)
	case "student":
		database.DB.Where("role = ?", "студент").Find(&users)
	default:
		database.DB.Find(&users)
	}
	return users, nil
}

func (u *UserServiceImpl) CreateUser(data map[string]string) (*models.User, error) {
	UserId := uuid.New().String()
	user := models.User{
		ID:          UserId,
		Name:        data["name"],
		Email:       data["email"],
		Picture:     data["picture"],
		Role:        data["role"],
		Stage:       data["stage"],
		Department:  data["department"],
		Interests:   data["interests"],
		Description: data["description"],
		Phone:       data["phone"],
	}
	if err := database.DB.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserServiceImpl) UpdateUser(id string, data map[string]interface{}) (*models.User, error) {
	var user models.User
	if err := database.DB.Find(&user, "id = ?", id).Error; err != nil {
		return nil, err
	}
	if val, ok := data["stage"].(string); ok {
		user.Stage = val
	}
	if val, ok := data["role"].(string); ok {
		user.Role = val
	}
	if val, ok := data["department"].(string); ok {
		user.Department = val
	}
	if val, ok := data["interests"].(string); ok {
		user.Interests = val
	}
	if val, ok := data["description"].(string); ok {
		user.Description = val
	}
	if val, ok := data["phone"].(string); ok {
		user.Phone = val
	}
	if val, ok := data["name"].(string); ok {
		user.Name = val
	}
	if val, ok := data["picture"].(string); ok {
		user.Picture = val
	}
	if val, ok := data["email"].(string); ok {
		user.Email = val
	}
	if err := database.DB.Save(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserServiceImpl) DeleteUser(id string) error {
	var user models.User
	if err := database.DB.Find(&user, "id = ?", id).Error; err != nil {
		return err
	}
	if err := database.DB.Delete(&user, "id = ?", id).Error; err != nil {
		return err
	}
	return nil
}
