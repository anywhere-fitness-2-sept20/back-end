# back-end

Currently there are 4 clients and 2 instructors to login with,
username: ExistingClient1 - 4 //Currently case sensitive
password: ClientPass1 - 4

username: ExistingInstructor1 - 2
password: instructorPass1 - 2

## Description

The Anywhere Fitness Database Endpoints

# User Endpoints

The main database url is https://anytime-fitness-database.herokuapp.com/api/fitness. All other endpoints add to this.
User Endpoints apply to instructors and clients.

## Method | Endpoint | Description

| POST | /register | Creates a `user`.
Requires: name, username, password, role.

| POST | /login | Logs a user in.
Requires: username, password, role.

| GET | /classes | Returns a list of all available classes. User must be logged in.
| GET | /classes/:classId | Returns details for each class
| GET | /instructors | Returns a list of instructors
| GET | /logout | Logs the user out Broken as broken can be

# Instructor Endpoints

Insructor endpoints return a 403 error when clients attempt to access.

## Method | Endpoint | Description

| GET | /instructors/clients | Returns a list of all clients
| GET | /instructors/:instructorId/classes | Returns a list of all fitness classes and clients in each of the classes that the instructor is hosting
| POST | /instructors/:instructorId/classes | Add new class for the instructor.
Requires: name, type, intensity, max_clients, day, start_time, duration, location
image_url is optional
| PUT | /:instructorId/classes/:classId | Updates existing class
No required fields but all that are sent to the server will be sent to the database.

| DELETE | /:instructorId/classes/:classId | Deletes existing class

# Client endpoints to come

## Method | Endpoint | Description

| GET | /clients/:clientId/classes | Returns a list of all classes that a client is signed up for
| POST | /clients/:clientId | Allows client to join a fitness class
| PUT | /clients/:clientId | Allows client to update their information
| DELETE | /clients/:clientId/classes/ | Removes client from class (currently broken)
