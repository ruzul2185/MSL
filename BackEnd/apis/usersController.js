const User = require('../models/User');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc Create new users
// @route POST/users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const {username , password, role} = req.body

    //confirm data
    if(!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    //check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate) {
        return res.status(409).json({message : 'Duplicate username'})
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, role };

    //Crete and Store new users
    const user = await User.create(userObject);
    if(user) {
        res.status(201).json({ message: `New user ${username} created`})
    }else {
        res.status(400).json({message: 'Invalid users data received'})
    }
})

// @desc update users
// @route PATCH/users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, role, active, password } = req.body

    //confirm data
    if(!id || !username || !role || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All field are required'})
    }

    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({message: 'User not found'})
    }

    //Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();

    //Allow updates to the original users
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate username'})
    }

    if(user.username !== username){
        user.username = username
    }

    user.role = role
    user.active = active

    if(password) {
        //Hashed password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save();

    res.json({message: `${updatedUser.username} updated`})
})

// @desc Delete users
// @route DELETE/users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({message: 'User ID required'});
    }

    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${user.username} with ID ${user._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
