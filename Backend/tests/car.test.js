import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import car from "../routes/car.js";

const app = new express();
app.use("/car", car);

describe("TESTS CAR", () => {
    beforeAll(async () => {
		await mongoose.connect(
			"mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
		);
		console.log("TEST DB");
	});

    test("POST /car/view", async () => {
        const car_no = 'AP00BG0517';
		const response = await request(app).post("/car/view").send({ car_no: car_no });
		expect(response.statusCode).toEqual(200);
    });
	
})