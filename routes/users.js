import express from "express"
import { createNewUser, getUserById } from "../controllers/UserController.js";
const router = express.Router();

/* GET users listing. */
router.get('/:id', getUserById);

router.post('/', createNewUser)


export default router;