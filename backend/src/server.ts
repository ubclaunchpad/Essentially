import express from "express";
import cors from "cors";
import textExtractor from "./textExtractor";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/", textExtractor);

export default app;
