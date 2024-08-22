
import  asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import  jwt from'jsonwebtoken'
import {encrypt, decrypt} from '../utils/aes.js'



//@desc login
//@route POST /api/login
//@access Private
const login = asyncHandler(async (req, res) => {


    
    const { username, password } = req.body
    console.log("login "+username+" "+password)
    //validate user input
    if (!(username && password)) {
        res.status(400)
        throw new Error('username or password are  required')
    }

    const user = await User.findOne({ username }).select('+password')

    if (user) {
        //decrypt key, iv with masterkey
        const bufferMasterKey = Buffer.from(process.env.MASTER_KEY, 'hex');
        const key = decrypt(user.key,bufferMasterKey,Buffer.alloc(16, 0))
        const iv = decrypt(user.iv,bufferMasterKey,Buffer.alloc(16, 0))
        // console.log(  key.toString('hex') );
        // console.log(  iv.toString('hex') );
        const passwordFromDecrypt = decrypt(user.password,key,iv)
        // console.log("password from decrypt : "+passwordFromDecrypt)
        if (passwordFromDecrypt==password) {
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            })
            console.log("login : " + token)
            //save token in uuser
            const oldUser = await User.findOne({ username },'-createdAt -updatedAt -__v -key -iv -createtime -_id')
   
            oldUser.token = token
            res.status(200).json(oldUser)
        }
        else{
            res.status(400)
            throw new Error('wrong username or password')
        }
    }
    else{
        res.status(400)
        throw new Error('wrong username or password')
    }
})

export{
    login
}