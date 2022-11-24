import app from "./server";
import express from "express";

app.post("/summary", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.content || !req.body.length) {
    res.status(400).send("Invalid Request - Please supply some text and length to summarize.");
  }

  res.setTimeout(60000, () => {
    res.status(504).send("Server Timed Out.");
  });

  try {
    // TODO Call Python API
  } catch (e: any) {}

  res.send({
    summarized_text: "Placeholder",
    meta: {
      length: 11,
    },
  });
});
