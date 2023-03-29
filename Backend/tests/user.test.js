import mongoose from "mongoose"
import config from "config"
import UserController from "../controllers/user.js"

const user = UserController()



describe("login test", () => {
    test("valid user", async () => {
        const data = {
            email: "sandyblaze911@gmail.com",
            passwd: "sandyblaze"
        }
        var result = JSON.stringify(user.authenticate(data)) 
    })
})
