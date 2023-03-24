import express from "express"
import user from "./routes/user.js"
import car from "./routes/car.js"
import cors from "cors"
import mongoose from "mongoose"
import config from "config"

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

app.use("/user", user)
app.use("/car", car)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("DB Connected")
        app.listen(3000, () => console.log(`open http://${HOST}:${PORT}`))
    })
    .catch(() => console.log("db NOT connected"))
