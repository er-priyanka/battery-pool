const { User } = require("../Models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = {
    async signup(req, res){
        // signup
        const {
            name, 
            email, 
            password, 
            profile
        } = req.body;

        try{
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({message: "Email is already exist!"});
            }

            bcrypt.hash(password, 8, async(err, hash)=>{
               
                const newUser = new User({
                    name,
                    email,
                    password: hash,
                    profile
                });

                await newUser.save();
                res.status(201).json({
                    message: "User created successfully!",
                    newUser
                })
            })
        }catch(err){
            // console.log(err);
            res.status(401).json({
                message: err.message
            });
        }
    },

    async signin(req, res){
        // signin
        const {email, password} = req.body;

        try{
            const user = await User.findOne({email});
            console.log(user);
            if(!user){
               return res.status(401).json({message: "Invalid credentials!"}); 
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if(!checkPassword){
                return res.status(401).json({message: "Invalid credentials!"});
            }

            const token = jwt.sign({
                userID: user._id
            }, process.env.JWT_KEY)

            res.status(200).json({
                message: "Login successful",
                token
            })

        }catch(err){
            res.status(401).json({
                message: err.message
            })
        }
    } 
}

module.exports = { UserController };

