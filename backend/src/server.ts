import express from "express";
import cors from "cors";
const app = express();

app.use(express.text());

app.use(cors());

export default app;
