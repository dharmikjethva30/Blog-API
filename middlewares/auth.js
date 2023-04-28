const jwt = require("jsonwebtoken")
const user = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied" })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const User = await user.findOne({ _id: verified._id, token : token })

        if (!User) {
            res.status(404).json({ message: "Invalid token" })
        }

        req.id = verified._id

        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = auth
