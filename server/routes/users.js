const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.route('/')
    // Get all Users
    .get((req, res) => {
        // console.log('inside get request for all users', req);
        User
            .find()
            .then(allUsers => {
                res.status(200).json(allUsers)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Create a User
    .post((req, res) => {
        // console.log('inside post request', req);
        const newUser = new User(req.body)
        newUser.save()
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('An internal server error has occured')
        });
    })

router.route('/:id')
    // Get a single User
    .get((req, res) => {
        //console.log('inside get request for single user', req);
        User
            .findById(req.params.id)
            .then(singleUser => {
                if (!singleUser) return res.status(404).send('Sorry, no user was found using that search criteria');
                res.status(200).json(singleUser)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Update a User
    .put((req, res) => {
        User
            .findByIdAndUpdate( req.params.id, req.body, { new: true } )
            .then(updatedUser => {
                res.status(204).json(updatedUser)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })
    // Delete a User
    .delete((req, res) => {
        User
            .findByIdAndRemove(req.params.id)
            .then(deletedUser => {
                res.status(200).json(deletedUser)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('An internal server error has occured')
            });
    })

module.exports = router;