
import  asyncHandler  from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

import  mongoose from 'mongoose'
//@desc Get users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('+password').select('+role').select('-__v').select('-createtime')
    res.status(200).json(users)
})



//@desc Set user
//@route POST /api/users
//@access Private
const setUser = asyncHandler(async (req, res) => {

    const { email,studentID, password } = req.body


    if (email) {
        var oldUser = await User.findOne({ email })
        if (oldUser) {
            res.status(400)
            throw new Error('email user is aleady use')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add email value')
    }

    encryptedPassword = await encrypt(password);

   
    if(!req.body.email){
        res.status(400)
        throw new Error('ใส่ email ด้วย')
    }
    if(!req.body.password){
        res.status(400)
        throw new Error('ใส่ password ด้วย')
    }


    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
   
    })

    //create token
    const token = jwt.sign(
        { user_id: user._id, studentID },
        process.env.TOKEN_KEY, {
        expiresIn: "2h"
    }
    )

    //save user token
    user.token = token

    oldUser = await User.findOne({ email })
    res.status(200).json(oldUser)

})




//@desc Update user
//@route PUT /api/users/:id
//@access Private
const putUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }

    const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updateduser)
})

//@desc Delete user
//@route DELETE /api/users
//@access Private
const deleteUserByGmail = asyncHandler(async (req, res) => {
    const {email} =  req.body
    const user = await User.findOne({email})
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }
    user.remove()

   
    res.status(200).json({ email:email })
})




//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user id not found')
    }
    const deleteuser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})



//@desc Get user
//@route GET /api/users/:id
//@access Private
const getUser = asyncHandler(async (req, res) => {
   
    var   user
    if( mongoose.Types.ObjectId.isValid(req.params.id) ) {
        user = await User.find({'_id':req.params.id}).select('+password').select('+role').select('-__v').select('-createtime')
    }
  else{
      user = await User.find({'studentID':req.params.id}).select('+password').select('+role').select('-__v').select('-createtime')
  }
   if (user.length >0) {
       res.status(200).json(user)
   }
   else{
       res.status(404)
       throw new Error("หาไม่เจอ")
   }

})



export  {
    deleteUserByGmail,
    getUsers,
    setUser,
    putUser,
    deleteUser,
    getUser
}