import ARSCar from '../models/car.js'
import ARSUser from '../models/user.js'

export default function CarsModule() {
    return {
        addCar: async function ({ car_no, seater_type, price_per_day, price_per_hour,
            company, model, manifactured_year, driven_distance, owner }) {
            try {
                const car = new ARSCar({
                    car_no: car_no,
                    seater_type: seater_type,
                    price_per_day: price_per_day,
                    price_per_hour: price_per_hour,
                    company: company,
                    model: model,
                    manifactured_year: manifactured_year,
                    driven_distance: driven_distance,
                    owner: owner,
                })
                const result = await car.save()
                const user = await ARSUser.findOneAndUpdate({ _id: owner }, {
                    $push: {
                        host: {
                            _id: result._id,
                            car_no: result.car_no,
                            company: result.company,
                            model: result.model,
                        }
                    }
                })
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        },
        getCarLocation: async function ({ car_no }) {
            const location = await ARSCar.findOne({ car_no: car_no }, { location: 1 })
            return location || { message: "car not avaliable" }
        },
        setCarLocation: async function ({ car_no, latitude, longitude }) {
            try {
                const result = await ARSCar.findOneAndUpdate({ car_no: car_no }, {
                    location: [latitude, longitude]
                })
                return result
            } catch (e) {
                return e
            }
        }
    }
}
