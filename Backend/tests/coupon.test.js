import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import user from "../routes/user.js";
import ARSCoupon from "../models/coupon.js";

const app = new express();
app.use("/user", user);

describe("TESTS COUPON", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2"
    );
    console.log("TEST DB Coupon");
  });

  test("Adding new coupon", async () => {
    const coupon = {
      coupon_code: "FLAT20",
      coupon_name: "ugadi offer",
      discount: {
        name: "percentage",
        value: 20,
      },
    };
    const new_coupon = await new ARSCoupon(coupon);
    expect(new_coupon.coupon_code).toEqual(coupon.coupon_code);
  });
});
