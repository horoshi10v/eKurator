# apiKurator
## Go REST API Backend with GORM, MySQL, and OAuth Google

This repository contains a Go-based REST API server application that uses the GORM library to interact with a MySQL database and Google's OAuth 2.0 for authentication. The application also has a [client part](https://github.com/horoshi10v/ekurator-client/tree/master), together with which they form a service for searching and placing profiles for joint work on university projects.

## Prerequisites

Before running this application, ensure that you have the following prerequisites installed on your system:

- Go (version 1.16 or higher)
- MySQL database
- Google OAuth credentials

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/horoshi10v/apiKurator.git
   ```

2. Change into the project directory:

   ```bash
   cd apiKurator
   ```

3. Install the necessary dependencies using the following command:

   ```bash
   go mod download
   ```

4. Set up the config by updating .env-file:

   ```env
   GOOGLE_CLIENT_ID = your client ID
   GOOGLE_CLIENT_SECRET = your client secret
   SECRET_KEY = your string
   SERVER_PORT = :8080
   CLIENT_PORT = http://localhost:3000
   DATABASE_CONFIG = USER:PASSWORD@/DB_NAME?&parseTime=True
   ```

5. Start the application by running the following command:

   ```bash
   go run main.go
   ```

6. The API server will be up and running on `http://localhost:8080`.

## API Endpoints

The following API endpoints are available:

- **POST** `/google/login`: Initiates the Google OAuth login process.
- **GET** `/google/callback`: Callback endpoint for handling the OAuth authorization code.
- **GET** `/google/logout`: Revokes the Google OAuth access token and logs out the user.
- **GET** `/user`: Retrieves a page of the authorized user.
- **GET** `/users`: Retrieves a list of all users.
- **GET** `/users/{id}`: Retrieves a user by ID.
- **PUT** `/users/{id}`: Updates a user by ID.
- **DELETE** `/users/{id}`: Deletes a user by ID.
- **POST** `/addUser`: Creates a new user.


## Libraries Used

The following libraries were used in this project:

- [Fiber](https://github.com/gofiber/fiber): HTTP web framework
- [GORM](https://gorm.io/): ORM library for interacting with the database
- [MySQL](https://github.com/go-sql-driver/mysql): MySQL driver for Go
- [Google OAuth](https://pkg.go.dev/golang.org/x/oauth2/google): Google OAuth client library for Go

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
