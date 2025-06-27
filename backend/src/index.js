import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import process from "node:process";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req, res) => {
  res.send('Public route');
});

// ✅ Protected route
app.get('/api/private', (req, res) => {
  if (!req.auth() || !req.auth().userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json({
    message: 'You are authenticated!',
    userId: req.auth().userId,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
