import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.text());

app.use(cors());

app.listen(port);

export default app;
