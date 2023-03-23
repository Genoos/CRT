import express from "express"
import user from "./routes/user.js"
import car from "./routes/car.js"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())

var count = 0

app.get('/', (req, res) => {
    ++count
    res.status(200).json({ message: `Hello from server [ count: ${count} ]` })
})

app.use("/user", user)
app.use("/car", car)

mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/DarwinBox2")
    .then(() => {
        console.log("DB Connected")
        app.listen(3000, () => console.log(`open http://127.0.0.1:${PORT}`))
    })
    .catch(() => console.log("db NOT connected"))
