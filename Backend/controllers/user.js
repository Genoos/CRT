import ARSUser from "../models/user.js"
import ARSCar from "../models/car.js"

export default function UserController() {
    return {
        authenticate: async function ({ email, passwd }) {
            const user = await ARSUser.findOne({ email: email, passwd: passwd }, { host: 0, car_booked: 0 })
            return user
        },
        createUser: async function ({ name, email, passwd, phone }) {
            var user = new ARSUser({
                name: name,
                email: email,
                passwd: passwd,
                phone: phone,
                host: []
            })
            try {
                var result = await user.save()
                return result
            } catch (e) {
                return e
            }
        },
        getCars: async function ({ _id }) {
            try {
                const data = await ARSUser.findOne({ _id: _id })
                return { host: data.host, car_booked: data.car_booked }
            } catch (e) {
                return { ...e, errno: 404 }
            }
        },
        bookCar: async function ({ car_no, email, from_date, from_time, to_date, to_time }) {
            try {
                const bookings = await ARSCar.findOne({ car_no: car_no }, { booking: 1 })
                for (const booking in bookings) {
                    if (booking.from_date + bookings.from_time <= from_date + from_time
                        || from_date + from_time <= booking.to_date + bookings.to_time) {
                        return { errno: 403 }
                    }
                    if (booking.from_date + bookings.from_time <= to_date + to_time
                        || to_date + to_time <= booking.to_date + bookings.to_time) {
                        return { errno: 403 }
                    }
                }
                const car_result = await ARSCar.findOneAndUpdate({ car_no: car_no }, {
                    $push: {
                        booking: {
                            email: email,
                            from_date: from_date,
                            from_time: from_time,
                            to_date: to_date,
                            to_time: to_time
                        }
                    }
                })
                const user_result = await ARSUser.findOneAndUpdate({ email: email }, {
                    $push: {
                        car_booked: {
                            car_no: car_no,
                            from_date: from_date,
                            from_time: from_time,
                            to_date: to_date,
                            to_time: to_time
                        }
                    }
                })
                return {
                    u_id: user_result._id,
                    c_id: car_result._id,
                    email: user_result.email,
                    car_no: car_result.car_no
                }
            } catch (e) {
                return { errno: 403, ...e }
            }
        }
    }
}
