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

## /users/profile Endpoint Documentation

### Description
This endpoint returns the profile details of the authenticated user.

### Endpoint Details
- **URL:** `/users/profile`
- **Method:** GET

### Authentication
Requires a valid JWT token via cookie or Authorization header.

### Response Example
```json
{
  "id": "user_id",
  "email": "user@example.com",
  // ...other profile fields...
}
```

## /users/logout Endpoint Documentation

### Description
This endpoint logs out the authenticated user by clearing the token cookie and blacklisting the current token.

### Endpoint Details
- **URL:** `/users/logout`
- **Method:** GET

### Authentication
Requires a valid JWT token.

### Response Example
```json
{
  "message": "Logged out successfully"
}
```

## Captain Routes Documentation

### /captains/register Endpoint Documentation

#### Description
This endpoint registers a new captain. All fields in the request must be provided, including fullname and vehicle details.

#### Endpoint Details
- **URL:** `/captains/register`
- **Method:** POST

#### Request Data
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.
- **fullname:** An object containing:
  - **firstname:** Required, minimum 3 characters.
  - **lastname:** Optional.
- **vehicle:** An object containing:
  - **color:** Required, minimum 3 characters.
  - **plate:** Required, minimum 1 character.
  - **capacity:** Required.
  - **vehicleType:** Must be one of: `car`, `motorcycle`, `auto`.

#### Sample Request Body
```json
{
  "fullname": {
    "firstname": "Captain",
    "lastname": "America"
  },
  "email": "captain@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Status Codes
- **201 Created:** When the captain is successfully registered.
- **400 Bad Request:** When validation fails or captain already exists.

#### Response Example
```json
{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "Captain",
      "lastname": "America"
    },
    "email": "captain@example.com",
    // ...other captain fields...
  }
}
```

## /captains/login Endpoint Documentation

### Description
This endpoint authenticates an existing captain using email and password.

### Endpoint Details
- **URL:** `/captains/login`
- **Method:** POST

### Request Data
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.

### Sample Request Body
```json
{
  "email": "captain@example.com",
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
  "captain": {
    "fullname": {
      "firstname": "Captain",
      "lastname": "America"
    },
    "email": "captain@example.com"
  }
}
```

## /captains/profile Endpoint Documentation

### Description
This endpoint returns the profile details of the authenticated captain.

### Endpoint Details
- **URL:** `/captains/profile`
- **Method:** GET

### Authentication
Requires a valid JWT token provided via cookie or Authorization header.

### Response Example
```json
{
  "id": "captain_id",
  "email": "captain@example.com",
  // ...other profile fields...
}
```

## /captains/logout Endpoint Documentation

### Description
This endpoint logs out the authenticated captain by clearing the token cookie and blacklisting the active token.

### Endpoint Details
- **URL:** `/captains/logout`
- **Method:** GET

### Authentication
Requires a valid JWT token.

### Response Example
```json
{
  "message": "Logged out successfully"
}
```

## Ride Endpoints

### /rides/create
**Description:** Creates a new ride request.  
**URL:** `/rides/create`  
**Method:** POST  
**Authentication:** Requires JWT token.  
**Request Body:**
```json
{
  "pickup": "Location A",
  "destination": "Location B",
  "vehicleType": "car"
  // Valid values: "car", "motorcycle", or "auto"
}
```
**Status Codes:**
- 201 Created: Ride created.
- 400 Bad Request: Validation error.
- 500 Internal Server Error: On failure.
**Response Example:**
```json
{
  "ride": {
    "_id": "ride_id",
    "user": "user_id",
    "pickup": "Location A",
    "destination": "Location B",
    "fare": 35,
    "status": "pending"
    // ...other ride fields...
  }
}
```

## Maps Endpoints

### /maps/get-coordinates
**Description:** Retrieves coordinates for a specified address.  
**URL:** `/maps/get-coordinates`  
**Method:** GET  
**Authentication:** Requires JWT token.  
**Query Parameter:**
- address: string
**Response Example:**
```json
{
  "ltd": 40.7128,
  "lng": -74.0060
}
```

### /maps/get-distance-time
**Description:** Retrieves distance and duration between two locations.  
**URL:** `/maps/get-distance-time`  
**Method:** GET  
**Authentication:** Requires JWT token.  
**Query Parameters:**
- origin: string
- destination: string
**Response Example:**
```json
{
  "distance": { "value": 5000 },
  "duration": { "value": 600 }
}
```

### /maps/get-suggestions
**Description:** Retrieves auto-complete suggestions for a given input.  
**URL:** `/maps/get-suggestions`  
**Method:** GET  
**Authentication:** Requires JWT token.  
**Query Parameter:**
- input: string
**Response Example:**
```json
[
  {
    "description": "New York, NY, USA"
    // ...other suggestion fields...
  }
]
```
