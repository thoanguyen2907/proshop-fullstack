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

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
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
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
  


export {authUser, getUsers, getUserProfile, registerUser, updateUserProfile, getUserById}