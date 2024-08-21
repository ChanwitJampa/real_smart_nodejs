import  express from 'express'
const router = express.Router()
import  { login} from '../controllers/loginController.js'


// router.route('/').get(getlogins).post(setlogin)
// router.route('/:id').put(putlogin).delete(deletelogin).get(getlogin)


// router.get('/', getlogin)
router.post('/',login)

// router.put('/:id', putlogin)
// router.delete('/:id', deletelogin)

export default router