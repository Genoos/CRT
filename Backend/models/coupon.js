import mongoose, { Schema } from "mongoose"
import ARSUser from './user.js'
const couponSchema = new mongoose.Schema({
    coupon_code: {
        type: String,
        required: true,
    },
    discount_percent: {
        type: Number,
        required: true,
    },
    coupon_used :{
        type:[{
            id:{
                type: Schema.Types.ObjectId,
                ref: ARSUser,
            }
        }],
        default: [],
    }
})
export default mongoose.model("ARSCoupon", couponSchema)
