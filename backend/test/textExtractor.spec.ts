// @ts-nocheck
import { expect } from "chai";
import request from "supertest";
import app from "../src/server.ts";

describe("Summary Endpoint Testing", () => {
  describe("200 Response GET Request", () => {
    it("Returns summary of given length for given text", async () => {
      const response = await request(app)
        .post("/summary")
        .send({
            content:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            length: 20,
        });

      expect(response.statusCode).to.equal(200);
      return;
    });
  });

  describe("400 Response GET Request", () => {
    it("Returns error if no string provided", () => {
      return request(app)
        .post("/summary")
        .send({
            length: 20,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
        });
    });
  });

  describe("504 Response GET Request", () => {
    it("Returns error if server times out", () => {
      return request(app)
        .post("/summary")
        .send({
            length: 20,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(504);
        });
    });
  });
});
