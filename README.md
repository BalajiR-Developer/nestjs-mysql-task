# NestJS + MySQL Task Management System

This project is a basic task/chat management system using **NestJS** with **MySQL**. It supports user registration and login using JWT, Excel import of task chats, and filtering tasks by status.

---

## Features

* User Registration & Login with JWT authentication
* Password hashing using `bcrypt`
* Upload `.xlsx` file to import chat messages
* Filter chats by `status` (e.g., pending, completed, etc.)

---

## Tech Stack

* **Backend**: NestJS (TypeScript)
* **Database**: MySQL
* **ORM**: TypeORM
* **Authentication**: JWT (Passport)
* **Excel Handling**: ExcelJS

---

## Installation & Setup

### 1. Clone the repository

```bash
https://github.com/your-repo/nestjs-mysql-task.git
cd nestjs-mysql-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=task_db
JWT_SECRET=your_jwt_secret
```

### 4. Run the application

```bash
npm run start:dev
```

NestJS server will start on `http://localhost:3000`

---

## API Endpoints

### Auth Routes

#### Register

```
POST /auth/register
Body: {
  "email": "test@example.com",
  "password": "123456",
  "name": "Test User"
}
```

#### Login

```
POST /auth/login
Body: {
  "email": "test@example.com",
  "password": "123456"
}
```

Response: `{ "access_token": "<jwt-token>" }`

---

### Chat Routes

#### Import Excel File

```
POST /chat/import
Header: Content-Type: multipart/form-data
Form-Data: file: <your_excel_file.xlsx>
```

#### Get Chats by Status

```
GET /chat?status=pending
GET /chat?status=completed
GET /chat?status=all
```

---

## Excel File Format

Your Excel file should have the following columns (first row = header):

| message     | status  | createdAt          |
| ----------- | ------- | ------------------ |
| Sample task | pending | 2024-01-01 10:00AM |

* `message`: Chat/task message
* `status`: Status string
* `createdAt`: Date string (will be converted to `Date`)

---

## License

MIT
