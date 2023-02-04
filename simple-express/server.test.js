import { response } from "express";
import request from "supertest";
import createServer from "./server.js";

const server = await createServer()

describe("Testing the server", function(){
    describe("Testing the /todo route", function() {
        it("Should be unable to get todos without flag", function(done) {
            request(server).get("/todo").expect(401).end(function(err) {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            });
        });

        it("Admin should be able to get todos", function(done) {
            request(server).get("/todo?admin=true").expect(200).end(function(err) {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            });
        });

        it("Admin should be able to post new todo", function(done) {
            request(server).post("/todo?admin=true").expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                } else {
                    expect(res.body).toEqual({ success: true })
                    done();
                }
            });
        });
    });

    describe("Testing the /todo/:todo route", function() {
        it("Should be unable to fetch single todo without flag", function(done) {
            request(server).get("/todo/:todo").expect(401).end(function(err) {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            });
        });

        it("Admin should be able to fetch single todo", function(done) {
            request(server).get("/todo/:todo?admin=true").expect(200).end(function(err) {
                if (err) {
                    throw err;
                } else {
                    done();
                }
            });
        });

        it("Admin should be able to change todo", function(done) {
            request(server).put("/todo/:todo?admin=true").expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                } else {
                    expect(res.body).toEqual({ success: true })
                    done();
                }
            });
        });

        it("Admin should be able to delete todo", function(done) {
            request(server).delete("/todo/:todo?admin=true").expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                } else {
                    expect(res.body).toEqual({ success: true })
                    done();
                }
            });
        });
    });
});