const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('email-validator')

const user = require('../models/user')

const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        if (!validator.validate(email)) {
            return res.status(400).send({ message: " Please enter a Valid Email address" })
        }
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(200).json({ name: newUser.name, email: newUser.email })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.findOne({ email })
        if (!User) {
            return res.status(404).json({ message: "User not found" })
        }

        const validPassword = await bcrypt.compare(password, User.password)
        if (!validPassword) {
            return res.status(400).json({ message: "Wrong password" })
        }

        const currtoken = jwt.sign({ _id: User._id }, process.env.JWT_SECRET)
        await user.findByIdAndUpdate(User._id, { token: currtoken })

        res.status(200).json({ message: "logged in", token: currtoken })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const logout = async (req, res) => {

    try {
        await user.findByIdAndUpdate(req.id, { token: null })

        res.status(200).json({ message: "Logged Out" })

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = { signup, login, logout }
