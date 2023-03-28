import mongoose from "mongoose"
import config from "config"
import UserController from "../controllers/user.js"

const user = UserController()

mongoose.connect(config.get("mongo.url"))
    .then(() => {
        console.log("DB Connected")
    })
    .catch(() => console.log("db NOT connected"))


describe("login test", () => {
    test("valid user", async () => {
        const data = {
            email: "sandyblaze911@gmail.com",
            passwd: "sandyblaze"
        }
        var result = JSON.stringify(user.authenticate(data)) 
    })
})
