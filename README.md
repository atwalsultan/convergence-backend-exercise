# Convergence Backend Exercise - Sultan

## Highlights

- The app uses Node.js.
- User's can sign up, log in and log out of the app. Authentication uses JSON Web Tokens.
- Authenticated users can create, read, update and delete tasks.
- Only authorized users can update or delete a task (task owners).
- Users can filter the tasks that have been completed or not completed.
- The app uses MongoDB as the database.

## How To Use

- Create an account by making a POST request to the '/api/users' endpoint.
- Log in by making a POST request to the '/api/sessions' endpoint.
- Log out by making a DELETE request to the '/api/sessions' endpoint.
- Create a task by making a POST request to the '/api/tasks' endpoint.
- Get (read) all tasks by making a GET request to the '/api/tasks endpoint.
- Get (read) a single task by making a GET request to the 'api/tasks/:taskId'
- Update a task by making a PUT request to the '/api/tasks/:taskId' endpoint.
- Delete a task by making a DELETE request to the '/api/tasks/:taskId' endpoint.
- Filter tasks depending on whether they have been completed or not by making a GET request to the '/api/tasks/filter/:filter'.

## Demo Videos

For more help on how to use the app, you can refer to the following videos (in order):

- [Sultan's BE Exercise (1)](https://www.loom.com/share/246e31275f124e3394054e1990c3ff9f)
- [Sultan's BE Exercise (2)](https://www.loom.com/share/d907f1e4963f475bbd43859581042fe8)
- [Sultan's BE Exercise (3)](https://www.loom.com/share/2d0717af448b4e76851ae77d0a0050ee)

## Notes

- JWT authentication might be a bit too much for this exercise but I had recently worked on a very similar authentication system and thought it would be quicker to implement. I made this decision because I was told that it would be greatly appreciated if I could finish the exercise before the end of the week.
