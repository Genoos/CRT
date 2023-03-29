import request from 'supertest'
import express from 'express'
import mongoose from 'mongoose'
import user from '../routes/user.js'

const app = new express()
app.use('/user', user)

describe("login test", () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2")
        console.log("TEST DB")
    })

    test("responds to /user/login", async () => {
        const email = "sandyblaze911@gmail.com"
        const passwd = "sandyblaze"
        const res = await request(app)
            .post('/user/login')
            .send({
                email: email,
                passwd: passwd
            })
        expect(res.statusCode).toEqual(200)
        expect(await res._body.email).toEqual(email)
    })
})
