import { Application } from "express";
import { init } from './app/app.js';

const PORT = process.env.PORT || 3001;

const app: Application = init();

// Start express server on port provided in environment file
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));