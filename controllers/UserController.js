
import  asyncHandler  from 'express-async-handler'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { encrypt, decrypt,generateKey,generateIV } from '../utils/aes.js';
import  mongoose from 'mongoose'
import  validator from 'validator';
import  { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('+password').select('-__v').select('-createtime')
    res.status(200).json(users)
})

const isEmail = (value) => validator.isEmail(value);
const isPhoneNumber = (value) => /^0\d{9}$/.test(value);

const setUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    
    if (username) {
        var oldUser = await User.findOne({ username })
        if (oldUser) {
            res.status(400)
            throw new Error('username user is aleady use')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add username value')
    }

    //validate
    if (!isEmail(username) && !isPhoneNumber(username)) {
        throw new Error(' username must be phone number or email')
    }


    //encrypt with personal ker, iv to store password
    const newKey = generateKey();
    const newIV = generateIV();
    const enPassword = encrypt(password,newKey,newIV)
  
    //encrypt key, iv before store in mongodb with masterkey
    const bufferMasterKey = Buffer.from(process.env.MASTER_KEY, 'hex');
    const encryptNewKey = encrypt(newKey,bufferMasterKey,Buffer.alloc(16, 0))
    const ecruptNewIV =  encrypt(newIV,bufferMasterKey,Buffer.alloc(16, 0))

    // console.log("realpassword :"+password+" realkey :"+newKey.toString('hex')+ " realiv : "+newIV.toString('hex'));
    // console.log("encryptPassword :"+password+" encryptKey :"+encryptNewKey+ " encryptIV : "+ecruptNewIV);

    const user = await User.create({
        username: req.body.username,
        password: enPassword,
        key:encryptNewKey,
        iv:ecruptNewIV
    })

    const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY, {
        expiresIn: "2h"
    }
    )
    user.token = token
    oldUser = await User.findOne({ username })
    res.status(200).json(oldUser)

})

const deleteUserByUsername = asyncHandler(async (req, res) => {
    const {username} =  req.body
    const user = await User.findOne({username})
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }
    user.remove()
    res.status(200).json({ email:email })
})

export  {
    deleteUserByUsername,
    getUsers,
    setUser
}