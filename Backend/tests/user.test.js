import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import user from "../routes/user.js";

const app = new express();
app.use("/user", user);

describe("TESTS", () => {
	beforeAll(async () => {
		await mongoose.connect(
			"mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
		);
		console.log("TEST DB");
	});

	test("POST /user/login", async () => {
		const email = "sandyblaze911@gmail.com";
		const passwd = "sandyblaze";
		const res = await request(app).post("/user/login").send({
			email: email,
			passwd: passwd,
		});
		expect(res.statusCode).toEqual(200);
		expect(await res.body.email).toEqual(email);
	});

	//   test("POST /user/register", async () => {
	//     const newuser = {
	//       name: "johnswick",
	//       email: "johns@gmail.com",
	//       passwd: "johnwick",
	//       phone: "1232512345",
	//     };
	//     const response = await request(app).post("/user/register").send(newuser);
	//     console.log(response.body);
	//     expect(response.statusCode).toEqual(200);
	//     expect(response.body.name).toEqual(newuser.name);
	//     expect(response.body.email).toEqual(newuser.email);
	//     expect(response.body.phone).toEqual(newuser.phone);
	//   });

	test("POST /user/getcars", async () => {
		const id = "641bdcb42ae3920b845bc23d";
		const response = await request(app).post("/user/cars").send({ _id: id });
		expect(response.statusCode).toEqual(200);
		console.log(response.body);
		expect(response.body.host).not.toBeNull();
		expect(response.body.car_booked).not.toBeNull();
	});

	test("POST /user/bookcar", async () => {
		const car = {
			car_no: "MH 12 1234",
			email: "john@gmail.coam",
			from_date: "2021-05-01",
			from_time: "12:00",
			to_date: "2021-05-02",
			to_time: "12:00",
		};
		const response = await request(app).post("/user/bookcar").send(car);
		expect(response.statusCode).toEqual(200);
	});
});
