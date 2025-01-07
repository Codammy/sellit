import express from "express"
import { createNewUser } from "../controllers/UserController.js";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', createNewUser)

export default router;