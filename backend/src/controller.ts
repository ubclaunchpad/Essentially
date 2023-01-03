import express from "express";
import { Router } from "express";
import { getKeywordsFromText } from "./keyword";
import { ISummarizationData } from "./interface";
import fetch from "node-fetch";

const routes = Router();

routes.post("/summary", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.content || !req.body.length) {
    res.status(400).send({
      message:
        "Invalid Request - Please supply some text and length to summarize.",
    });
  }

  res.setTimeout(60000, () => {
    res.status(504).send({
      message: "Server Timed Out.",
    });
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data: ISummarizationData) => {
        res.send({
          summarized_text: data.summarized_text,
          meta: data.Meta,
        });
      })
      .catch((e: any) => {
        e.json().then((json: any) => {
          res.status(json.code).send({
            message: json.message,
          });
        });
      });
  } catch (e: any) {
    res.status(500).send({
      message: e.message,
    });
  }
});

routes.post("/keyword", (req: express.Request, res: express.Response) => {
  if (!req.body || !req.body.text) {
    res
      .status(400)
      .send("Invalid Request - Please supply some text extract keywords from.");
  }

  res.setTimeout(60000, () => {
    res.status(504).send("Server Timed Out.");
  });

  try {
    res.send(getKeywordsFromText(req.body.text, req.body.numOfKeywords));
  } catch (e: any) {
    res.status(500).send({
      message: e.message,
    });
  }
});

export default routes;
