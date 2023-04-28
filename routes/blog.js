const express = require('express')
const blog_route = express.Router()

const { createBlog, getMyBlogs, updateBlog, deleteBlog, getBlogs } = require('../controllers/blog')
const auth = require('../middlewares/auth')

blog_route.post('/create', auth, createBlog)
blog_route.get('/myblogs', auth, getMyBlogs)
blog_route.patch('/update', auth, updateBlog)
blog_route.delete('/delete', auth, deleteBlog)
blog_route.get('/blogs', getBlogs)


module.exports = blog_route