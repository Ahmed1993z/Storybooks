const express = require('express')
const router = express.Router()
const passport = require('passport')

// @desc  Auth with Google
//@route GET /auth/google
router.get('/google', passport.authenticate('google', {
    scope:
        ['profile']
}))

// @desc  Google auth callback
//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

//@Ddesc Logout User
//@route /auth/logout

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    })
})
module.exports = router