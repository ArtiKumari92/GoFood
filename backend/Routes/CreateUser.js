const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post("/createuser",  async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
        
        } catch(error){
            console.log(error);
            res.json({success: false, error: error.message});
        }
    })

    module.exports = router;