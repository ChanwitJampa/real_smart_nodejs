import  express from 'express'
const router = express.Router()
import  { getUsers,setUser,putUser,deleteUser,getUser,deleteUserByGmail } from '../controllers/userController.js'


router.route('/').get(getUsers).post(setUser).delete(deleteUserByGmail)
router.route('/:id').put(putUser).delete(deleteUser).get(getUser)


// router.get('/', getUsers)
// router.post('/',postUser)

// router.put('/:id', putUser)
// router.delete('/:id', deleteUser)

export default router