import express, { Application } from 'express';
import responsesRouter from './routes/responses';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

app.use(express.json());

// Define routes
app.use('/responses', responsesRouter);

// Root URL
app.get('/', (req, res) => {
  res.send('Welcome to Fillout Responses Filter API server!');
});

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
