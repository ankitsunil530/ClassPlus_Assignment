# Custom Greetings & Wishes App

This is a MERN stack app for making custom greeting cards. A user can login, add name and photo, choose a template, save the greeting, and download it as an image.

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB Atlas

## Features

- Login and register
- Add user name and profile photo
- Show greeting templates from backend
- Filter templates by category
- Premium template popup
- Save greetings
- Download greeting as PNG
- Share greeting if supported by browser

## Project Folders

```text
backend/
  config/
  controllers/
  models/
  routes/
  server.js

greetings-app/
  src/
    components/
    hooks/
    pages/
```

## API Routes

```text
GET    /api/templates
POST   /api/users/register
POST   /api/users/login
POST   /api/greetings
GET    /api/greetings?userId=USER_ID
```

## Run Project

Install dependencies:

```bash
npm run install:all
```

Start backend:

```bash
npm run backend
```

Start frontend:

```bash
npm run frontend
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

## Environment Variables

Backend `.env`:

```text
PORT=5000
MONGODB_URI=your_mongodb_url
CLIENT_URL=http://localhost:5173
```

Frontend `.env`:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```
##Screenshots
<img width="1917" height="868" alt="image" src="https://github.com/user-attachments/assets/3849068a-afe9-4ccf-98a3-28a3acae7dfe" />
