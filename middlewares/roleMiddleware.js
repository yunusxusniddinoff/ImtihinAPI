const roleMiddleware = (...role) => {
    return (req, res, next) => {
        try {
            if(!req.user || !req.user.role) {
                return res.status(401).json({
                    message: "Tokenda hatolik bor"
                })
            }
    
            if(!role.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Siz kirishingiz mumkun emas"
                })
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(500).send("Serverda hatolik bor")
        }
    }
} 


module.exports = roleMiddleware