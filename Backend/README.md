# /users/register Endpoint Documentation

## Description
This endpoint is used to register a new user in the system.  
It expects the user's email, password, and fullname (with firstname and optionally lastname) in the request body.

## Endpoint Details
- **URL:** `/users/register`
- **Method:** POST

## Request Data
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.
- **fullname:** An object containing:
  - **firstname:** Required, minimum 3 characters.
  - **lastname:** Optional, minimum 3 characters if provided.

### Sample Request Body
```json
{
  "email": "user@example.com",
  "password": "securePass123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

## Status Codes
- **201 Created:** When the user is successfully registered.
- **400 Bad Request:** When validation fails (e.g. missing or invalid data).

## Additional Notes
- On successful registration, a JWT token is returned along with the user data.

### Response Example
```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "password" : "hashedpassword"
  }
}
```

## /users/login Endpoint Documentation

### Description
This endpoint authenticates an existing user using email and password.

### Endpoint Details
- **URL:** `/users/login`
- **Method:** POST

### Request Data
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.

### Sample Request Body
```json
{
  "email": "user@example.com",
  "password": "securePass123"
}
```

### Status Codes
- **200 OK:** When authentication is successful.
- **400 Bad Request:** When validation fails.
- **401 Unauthorized:** When the email or password is incorrect.

### Response Example
```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```
