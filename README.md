# InventoryIT

```


InventoryIT is a backend API for managing and inventorying computer equipment in a company.
 It is built with Nest.js framework in TypeScript language.
 It is a RESTful application that allows users to perform CRUD operations on users and equipment data.

## Installation

To install the project, you need to have Node.js and npm installed on your machine.
Then, clone the project from GitHub and run the following command in the project directory:

```
npm install
```

This will install all the dependencies required for the project.

## Usage

To run the project, use the following command:

```bash
npm run start
```

This will start the server on port 3000. You can then use a tool like Postman or curl to send requests to the API endpoints. The available endpoints are:

- `/user` - for managing users and equipment, supports GET, POST, PUT, and DELETE methods
- `/equipment` - for managing equipment, supports GET, POST, PUT, and DELETE methods
- `/auth/login` - for logging in, returns a JWT token
- `/auth/logout` - for logging out, invalidates the JWT token

## License

This project is licensed under the MIT License. See the [LICENSE](^1^) file for more details.

## Authors

This project is created by Wojciech Niewiński. You can contact him at niewinski.woj@gmail.com.
```
