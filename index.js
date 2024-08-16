// app is the parent module: it is the core of the entire application and manages all configuration and sub-modules (such as router).
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from './routes/auth-routes.js';
import fortuneRouter from './routes/fortune-routes.js';

const PORT = process.env.PORT || 9060;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (_req, res) => {
    res.send("Welcome to Fortune House API");
});

app.use('/api/auth', authRoutes);
app.use('/api/fortune', fortuneRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});