import  express from 'express'
const router = express.Router()
import  { getUsers,setUser,deleteUserByUsername } from '../controllers/UserController.js'


router.route('/').get(getUsers).post(setUser).delete(deleteUserByUsername)


export default router