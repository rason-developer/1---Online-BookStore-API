const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {generateToken} = require("../utils/jwtHelper");
const {validationResult} = require("express-validator");


exports.login = async (req, res) => {

   try {
    const {email, password} = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
        return res.status(400).json({message:"invalid email"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({message:"Invalid password"});
    }

    const token = generateToken({id:user.id, role:user.role});

    return res.status(200).json({message:"Logged in succesfully", token});
   }catch (err) {
    res.status(500).json({message:"error: ", err});
   }
}

exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findByEmail(email);
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({message: "Email already registered."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.createUser(username, email, hashedPassword);
        return res.status(201).json({message: 'User registered succesfully', user});

    }catch (err) {
        res.status(500).json({message:"error: ", err})
       }
}

