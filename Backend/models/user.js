import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9\.]{1,26}@gmail.com$/.test(v)
            }
        }
    },
    passwd: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 8
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v)
            },
        },
    },
    host: {
        type: [{
            _id: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            car_no: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        return /^[A-Z]{2}\d\d[A-Z]{2}\d\d\d\d$/.test(v)
                    }
                }
            }
        }],
        required: true,
    }
})

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ phone: 1 }, { unique: true })

export default mongoose.model("ARSUser", userSchema)
