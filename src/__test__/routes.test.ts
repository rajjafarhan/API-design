import app from "../server";

import supertest from "supertest";

describe("GET /", ()=> {
  it("responds with json", async () =>{
    const res = await supertest(app)
      .get("/")
      
    expect(res.body.message).toBe('hello')
  });
});