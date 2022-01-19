import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

const authUser = async (req, res) => {
    const {email, password} = await req.body; 
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }  
}

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        
        })
    } else{
        res.status(404).json({
            message: 'User not found'
        })
    }
}

const registerUser = async (req, res) => {
    const {email, password, name} = req.body; 
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400).json({
            message: "User already exists"
        })
    } 
    const user = await User.create({
        name, email, password
    })
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message: "Invalid user data"
        })
    }
}




const getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}


export {authUser, getUsers, getUserProfile, registerUser}