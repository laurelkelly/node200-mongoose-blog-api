const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.route('/')
    // Get all Blogs
    .get((req, res) => {
        Blog
            .find()
            .then(allBlogs => {
                res.status(200).json(allBlogs)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Create a Blog & associate to userID
    .post((req, res) => {
        // New higher scope variable
        let dbUser = null;
        // Fetch the User from the database
        User 
            .findById(req.body.author)
            .then(user => {
                // Store the fetched User in higher scope variable
                dbUser = user;
                // Create a Blog
                const newBlog = new Blog(req.body);
                // Bind the User to it
                newBlog.author = user._id;
                // Save it to the database
                return newBlog.save();
            })
            .then(savedBlog => {
                // Push the saved blog to the array of blogs associated with the User
                dbUser.blogs.push(savedBlog);
                // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
                dbUser.save().then(() => res.status(201).json(savedBlog))
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })

router.route('/featured')
    // Get all featured Blogs
    .get((req, res) => {
        Blog
            .where( { featured: true } )
            .then(featuredBlogs => {
                res.status(200).json(featuredBlogs)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })

router.route('/:id')
    // Get a single Blog
    .get((req, res) => {
        Blog
            .findById(req.params.id)
            .then(singleBlog => {
                if (!singleBlog)
                return res.status(404).send('Sorry, no blog was found using that search criteria');
                res.status(200).json(singleBlog)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Update a Blog
    .put((req, res) => {
        Blog
            .findByIdAndUpdate( req.params.id, req.body, {new: true } )
            .then(updatedBlog => {
                res.status(204).json(updatedBlog)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Delete a Blog
    .delete((req, res) => {
        Blog
            .findByIdAndRemove(req.params.id)
            .then(deletedBlog => {
                res.status(200).json(deletedBlog)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })


module.exports = router;