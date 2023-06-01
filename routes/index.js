const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../midleware/auth')
const Story = require('../models/Story')

// @desc  Login/Landing page
//@route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login.hbs', {
        layout: "login",
    })
})

// @desc  Dashboard
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard.hbs', {
            name: req.user.firstName,
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }


})


module.exports = router