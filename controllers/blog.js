const blog = require('../models/blog')


const createBlog = async (req, res) => {
    const { title, content } = req.body

    try {
        const newBlog = await blog.create({
            title,
            content,
            author: req.id
        })

        res.status(200).json(newBlog)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getMyBlogs = async (req, res) => {
    try {
        const Blogs = await blog.find({ author: req.id })
        if (!Blogs) {
            return res.status(404).send({ message: "Blogs not Found" })
        }

        res.status(200).json(Blogs)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateBlog = async (req, res) => {
    const { id, title, content } = req.body

    try {
        const updatedBlog = await blog.findById(id)

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not Found" })
        }

        if (!(updatedBlog.author == req.id)) {
            return res.status(400).json({ message: "Action Not allowed" })
        }

        updatedBlog.title = title
        updatedBlog.content = content
        await updatedBlog.save()

        res.status(200).json(updatedBlog)

    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.query

    try {
        const deletedBlog = await blog.findByIdAndDelete(id)
        if (!deletedBlog) {
            return res.status(404).send({ message: "Blog not Found" })
        }

        if (!(deletedBlog.author == req.id)) {
            return res.status(400).json({ message: "Action Not allowed" })
        }

        res.status(200).json({ deletedblog: deletedBlog })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getBlogs = async (req, res) => {
    try {
        const Blogs = await blog.find()
        if (!Blogs) {
            return res.status(404).send({ message: "Blogs not Found" })
        }
        res.status(200).json(Blogs)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { createBlog, getMyBlogs, updateBlog, deleteBlog, getBlogs }