const {z} = require("zod")

const courierSchema = z.object({
    fullname: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    vehicle: z.string().min(3)
})

module.exports = courierSchema