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
        expect(result).toEqual(JSON.stringify({ "__v": 0, "_id": "641bdcb42ae3920b845bc23d", "email": "sandyblaze911@gmail.com", "name": "sandeep", "passwd": "sandyblaze", "phone": "9000810975" }))
    })
})
