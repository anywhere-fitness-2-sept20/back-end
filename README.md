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
