import express from 'express';
import dotenv from 'dotenv';
import process from "node:process";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Welcome to the API root');
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from ESM + TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
