# back-end

Main API route is /api/fitness

/register
End point requires a name, username, password, and role ("instructor" or "client") all other roles are rejected

/login
End point requires a username, password, and role. (same format as before)

There are 4 clients to login with,
username: ExistingClient1 - 4 //Currently case sensitive
password: ClientPass1 - 4

There are 2 instructors to login with,
username: ExistingInstructor1 - 2
password: instructorPass1 - 2

I have added a few class types to choose from in the database.
Zumba, Yoga, Meditation, and Boxing

# Authentication Project

## Topics

- Authentication.
- Express Middleware.
- Password Hashing.
- Sessions
- Cookies

## Description

Use `Node.js`, `Express` and `Knex` to build an API that provides **Register** and **Login** functionality using `SQLite` to store _User_ information. Make sure the password is not stored as plain text.

## Assignment

Complete the following endpoints:

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.                                                                                                                                                         |
| POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' |
| GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.                                                                                                |

Add support for **sessions** and **cookies**, use them to keep a record of logged in users across requests.

## Stretch Problem

- Write a piece of **global** middleware that ensures a user is logged in when accessing _any_ route prefixed by `/api/users`.
- Build a React application that implements components to register, login and view a list of users. Gotta keep sharpening your React skills.
