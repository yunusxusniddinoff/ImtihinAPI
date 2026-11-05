const jwt = require("jsonwebtoken")

const authMiddleware =(req, res, next) => {
try {
        const authHeader = req.headers.authorization
    
        if(!authHeader) {
            return res.status(401).json({
                message: "Tokeningiz kerak"
            })
        }
    
        const token = authHeader.split(" ")[1]

        if(!token) {
            return res.status(400).send("Token formati hato")
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        req.user = decoded
    
        next()
} catch (error) {
    res.status(500).json({
            message: error.message
        })
    }
}

module.exports = authMiddleware