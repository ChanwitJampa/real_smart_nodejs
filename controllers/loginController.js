
import  asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import  jwt from'jsonwebtoken'




//@desc login
//@route POST /api/login
//@access Private
const login = asyncHandler(async (req, res) => {


    
    const { studentID, password } = req.body
    console.log("login "+studentID+password)
    //validate user input
    if (!(studentID && password)) {
        res.status(400)
        throw new Error('studentID or password are  required')
    }

    const user = await User.findOne({ studentID }).select('+password')

    if (user) {
        // if ((await bcrypt.compare(password, user.password))) {
        if (password == user.password) {
            const token = jwt.sign(
                { user_id: user._id, studentID },
                process.env.TOKEN_KEY, {
                expiresIn: "24h"
            })
            console.log("login : " + token)
            //save token in uuser
            const oldUser = await User.findOne({ studentID },'-createdAt -updatedAt')
            //if want to deselect _id await User.findOne({ studentID }, '-_id')
            oldUser.token = token
            res.status(200).json(oldUser)
        }
        else{
            res.status(400)
            throw new Error('wrong studentID or password')
        }

    }
    else{
        res.status(400)
        throw new Error('wrong studentID or password')
    }

   


})

export{
    login
}