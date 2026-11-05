const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            fullname: user.fullname,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2d"
        }
    )
}

module.exports = generateToken