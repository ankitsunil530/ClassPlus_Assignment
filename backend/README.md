# Custom Greetings & Wishes Backend

Express + MongoDB Atlas API for greeting templates and optional user saving.

## API Routes

- GET /api/health
- GET /api/templates
- POST /api/users
- POST /api/users/register
- POST /api/users/login
- GET /api/greetings?userId=:userId
- POST /api/greetings

## Scripts

```bash
npm install
npm run dev
npm start
```

Create `.env` from `.env.example` and set:

```text
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
```
