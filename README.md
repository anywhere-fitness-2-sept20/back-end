# back-end

Currently there are 4 clients and 2 instructors to login with,
username: ExistingClient1 - 4 //Currently case sensitive
password: ClientPass1 - 4

username: ExistingInstructor1 - 2
password: instructorPass1 - 2

## Description

The Anywhere Fitness Database Endpoints

# User Endpoints

The main database url is /api/fitness. All other endpoints add to this.
User Endpoints apply to instructors and clients.

## Method | Endpoint | Description

| POST | /register | Creates a `user`. Requires: name, username, password, role.

| POST | /login | Logs a user in.

| GET | /classes | Returns a list of all available classes. User must be logged in.

# Instructor Endpoints

Insructor endpoints return a 403 error when clients attempt to access.

## Method | Endpoint | Description

| GET | /clients | Returns a list of all clients
| GET | /:id/classes | Returns a list of all classes from instructor with matching id
| POST | /:id/classes | Add new class for the instructor.
Requires: name, type, intensity, max_clients, day, start_time, duration, location

| PUT | /:id/classes/:classId | Updates existing class
Requires: name, type, intensity, max_clients, day, start_time, duration, location

| DELETE | /:id/classes/:classId | Deletes existing class

# Client endpoints to come

## Method | Endpoint | Description
