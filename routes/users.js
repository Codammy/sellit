import express from "express"
import { createNewUser, getAuthenticatedUser, getUserById, updateUser } from "../controllers/UserController.js";
const router = express.Router();

/* GET users listing. */
router.get('/me', getAuthenticatedUser);

router.get('/:id', getUserById);

router.post('/new', createNewUser)

router.put('/', updateUser);


// router.delete('/')
export default router;