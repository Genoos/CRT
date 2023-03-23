import express from "express"
import CarsModule from "../modules/car.js"

const app = express.Router()
const carModule = CarsModule()
app.use(express.json())

const speed = 0.0001
var coords = {
    "AP17X1729": {
        latitude: 17.4477228,
        longitude: 78.3757079
    }
}

app.route('/location/:idplate')
    .get(async (req, res) => {
        let car = req.params.idplate
        coords[car].latitude += speed
        coords[car].longitude += speed
        res.status(200).json(coords[car])
    })

app.route('/addcar')
    .post(async (req, res) => {
        let data = req.body
        res.status(200).json(await carModule.addCar(data))
    })

app.route('/nearby')
    .post(async (req, res) => {
        let data = req.body
        res.status(200).json(await carModule.getNearLocation(data))
    })

app.route('/setlocation')
    .post(async (req, res) => {
        let data = req.body
        res.status(200).json(await carModule.setCarLocation(data))
    })

const car = app
export default car
