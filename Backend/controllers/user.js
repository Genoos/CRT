import ARSUser from "../models/user.js"


export default function UserController() {
    return {
        authenticate: async function ({ email, passwd }) {
            const user = await ARSUser.findOne({ email: email, passwd: passwd }, { host: 0 })
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
                return data.host
            } catch (e) {
                return { ...e, errno: 404 }
            }
        }
    }
}
