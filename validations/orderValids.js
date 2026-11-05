const {z} = require("zod")

const orderSchema = z.object({
    price: z.string().min(0),
    customerName: z.string().min(2),
    address: z.string().min(4),
})

module.exports = orderSchema