import express from "express"
import { createNewUser, getAuthenticatedUser, getUserById, updateUser } from "../controllers/UserController.js";
import { createCatalog, removeFromCatalog, getAllCatalogs  } from "../controllers/CatalogController.js";
const router = express.Router();

/* GET users listing. */

router.get('/catalog', getAllCatalogs)

router.post('/catalog', createCatalog)

router.delete('/catalog/:id', removeFromCatalog)

router.get('/me', getAuthenticatedUser);

router.get('/:id', getUserById);

router.post('/new', createNewUser)

router.put('/', updateUser);



// router.delete('/')
export default router;