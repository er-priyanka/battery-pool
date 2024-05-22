# Task Management App
A full stack app in which user can manage the tasks. Every user can create his own tasks and also update and delete the task.

## Deployed Link
**Frontend** https://battery-pool.vercel.app/

**Backend** https://battery-pool-1.onrender.com

## Use this credentials to see the flow
email: priyanka@gmail.com
password: 1234

## Tech Stack:

### Frontend:
- React.Js
- Redux
- React-redux
- Redux toolkit
- Material-UI
- React-router-dom

### Backend:

- Node.js
- Express
- Mongoose
- Mongodb Atlas
- Cors
- dotenv
- bcrypt
- JSON Web Token


## Setup Instructions
1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install dependencies:
```bash
npm install
```
4. Start the frontend development server:
```bash
npm run start
```
5. Start the backend server:
```bash
npm run start
```
6. Access the application in your web browser.


## Backend

### APIs Developed
1. *Auth Flow*
   - User Schema: name, email, password, profile
   - *Endpoints:*
     - auth/signin
     - auth/signup (with validation)

2. *Tasks CRUD*
   - Schema: title, description, dueDate, status, image, user
   - *Endpoints:*
     - /tasks : get all tasks 
     - /tasks : create new task
     - tasks/:id : get single task by id
     - tasks/:id : update task by id
     - tasks/:id : delete task by id
    



## Frontend

### Features Implemented
1. *Signin & Signup*
   - User authentication with email and password
   - Redirect to Signup page on successful creating an account
   
2. *Home Page
   - If you have already created your tasks then you can see all tasks on the home page in the form of table else you need to create your tasks first and then you will able to see your tasks.
   
3. *Tasks Page*
   - You can see all tasks here
   - Use Crate task button to create a new task
   - Action column used to edit and delete the task


## Screenshots
**Signin Page**
![Signin Page](/frontend/src/Images/signin.png)

**Signup Page**
![Signup Page](/frontend/src/Images/signup.png)

**Tasks**
![Tasks ](/frontend/src/Images/tasks.png)

**Update Task**
![Update task ](/frontend/src/Images/updatetask.png)

**Create New Task**
![Create New Task](/frontend/src/Images/createTask.png)

**Task List(downloaded)**
![Task List in PDF format ](/frontend/src/Images/taskpdf.png)



