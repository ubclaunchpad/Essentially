import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

app.post("/summary", (req: express.Request, res: express.Response) => {
    if (!req.body || !req.body.content || !req.body.length) {
        res.status(400).send("Invalid Request - Please supply some text and length to summarize.");
    } else {
        res.setTimeout(60000, () => {
            res.status(504).send("Server Timed Out.");
        });

        try {
            // TODO Call Python API
        } catch (e: any) {}

        res.status(200).send({
            summarized_text: "Placeholder",
            meta: {
                length: 11,
            },
        });
    }


});


export default app;
