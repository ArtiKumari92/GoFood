const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {

    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message });
    }
})

// Authenticate a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        if(req.body.password !== user.password) {
            return res.status(400).json({ errors: "Try Logging in with correct credentials" });
        }
            
        return res.json({ success: true });

    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})


module.exports = router;