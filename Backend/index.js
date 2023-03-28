import express from "express"
import user from "./routes/user.js"
import car from "./routes/car.js"
import cors from "cors"
import mongoose from "mongoose"
import config from "config"
import multer from "multer"

const app = express()
const HOST = config.get('server.host')
const PORT = config.get('server.port')
const MONGO_URL = config.get('mongo.url')
app.use(cors())
app.use(express.json())

var count = 0

app.get('/', (req, res) => {
    ++count
    res.status(200).json({ message: `Hello from server [ count: ${count} ]` })
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images')
    },
    filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop()
        const file_name = Math.floor(100000 + Math.random() * 100000) + '_' + Date.now() + '.' + ext
        file.filename = file_name
        callback(null, file.filename)
    }
})
const upload = multer({ storage: storage }).single("profile_picture")

app.post("/upload", async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.status(200).json({ errno: 400 })
        } else {
            res.status(200).send(req.file)
        }
    })
})

app.use("/user", user)
app.use("/car", car)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("DB Connected")
        app.listen(3000, () => console.log(`open http://${HOST}:${PORT}`))
    })
    .catch(() => console.log("db NOT connected"))
