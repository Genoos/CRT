import ARSAdmin from "../models/admin.js"
import ARSCoupon from "../models/coupon.js"

export default function AdminController() {
    return {
        login: async function ({ email, passwd }) {
            try {
                const result = await ARSAdmin.findOne({ email: email, passwd: passwd })
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        },
        createAdmin: async function ({ email, passwd }) {
            try {
                const admin = new ARSAdmin({
                    email: email,
                    passwd: passwd
                })
                const result = await admin.save()
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        },
        createCoupon: async function ({ coupon_name, coupon_code, name, value }) {
            const coupon = new ARSCoupon({
                coupon_name: coupon_name,
                coupon_code: coupon_code,
                discount: {
                    name: name,
                    value: value,
                }
            })
            try {
                const result = await coupon.save()
                return result
            } catch (e) {
                return { ...e, errno: 403 }
            }
        }
    }
}