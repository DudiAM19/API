const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            anjay123
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                userName: req.body.user_name
            }
        );
        !user && res.status(401).json('Wrong user name');

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            anjay123
        );
        const originalPassword  = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;
        originalPassword != inputPassword && res.status(401).json('wrong password');
        const accesToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            123456789,
                {expiresIn: '3d'}
            );

            const {password, ...others} = user._doc;
            res.status(200).json({...others, accesToken});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;