import express from "express"
import user from "./routes/user.js"
import car from "./routes/car.js"
import cors from "cors"
import mongoose from "mongoose"
import config from "config"
import { Server } from "socket.io"
import http from "http"

const app = express()
const HOST = config.get("server.host")
const PORT = config.get("server.port")
const MONGO_URL = config.get("mongo.url")
app.use(cors())
app.use(express.json())

var count = 0

app.get("/", (req, res) => {
	++count
	res.status(200).json({ message: `Hello from server [ count: ${count} ]` })
})

app.use("/user", user)
app.use("/car", car)

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
        origin: "*",
    },
})

io.on("connection", function (socket) {
	console.log(socket.id)
	socket.on("disconnect", function () {
        console.log(socket.id + " : disconnected")
    })
})

mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("DB Connected")
		app.listen(PORT, () => console.log(`open http://${HOST}:${PORT}`))
		server.listen(4000, () => console.log(`socket http://${HOST}:4000`))
	})
	.catch(() => console.log("db NOT connected"))
