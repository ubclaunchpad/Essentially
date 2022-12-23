import express from "express";
import { Router } from "express";
import { getKeywordsFromText } from "./keyword";
import { ISummarizationData } from "../interface";
import fetch from "node-fetch";

const routes = Router();

routes.get("/status", async (req: express.Request, res: express.Response) => {
  try {
    let status = (await fetch("http://127.0.0.1:8000/status")).status;
    if (status === 200) {
      res.status(200).send("Everything is essentially running :)");
    } else {
      res.status(status).send("Essentially is active but Summary API is down :(");
    }
  } catch (e) {
    res.status(500).send("Essentially is active but Summary API is down :(");
  }
});

routes.post("/summary", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.content || !req.body.length) {
    res.status(400).send("Invalid Request - Please supply some text and length to summarize.");
  }

  res.setTimeout(60000, () => {
    res.status(504).send("Server Timed Out.");
  });

  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: {
          text: req.body.content,
        },
        length: req.body.length,
      }),
    };

    fetch("http://127.0.0.1:8000/articles/summary", requestOptions)
      .then((res) => res.json())
      .then((data: ISummarizationData) => {
        res.send({
          summarized_text: data.summarized_text,
          meta: data.Meta,
        });
      });
  } catch (e: any) {
    console.log(e);
  }
});

routes.post("/keyword", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.text) {
    res.status(400).send("Invalid Request - Please supply some text extract keywords from.");
  }

  res.setTimeout(60000, () => {
    res.status(504).send("Server Timed Out.");
  });

  res.send(getKeywordsFromText(req.body.text, req.body.numOfKeywords));
});

export default routes;
