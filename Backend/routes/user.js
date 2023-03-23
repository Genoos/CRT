import express from "express"
import UserModule from "../modules/user.js"

const app = express.Router()
app.use(express.json())
const userModule = UserModule()

app.route("/login")
    .post(async (req, res) => {
        let data = await userModule.authenticate(req.body)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(200).json({ errno: 404, message: "Data not found" })
        }
    })

app.route("/register")
    .post(async (req, res) => {
        let data = await userModule.createUser(req.body)
        if (data['email']) {
            res.status(200).json(data)
        } else {
            res.status(200).json({ errno: 406, message: "Error in inserting" })
        }
    })

app.route('/cars')
    .post(async (req, res) => {
        let data = await userModule.getCars(req.body)
        res.status(200).json(data)
    })

const user = app
export default user
