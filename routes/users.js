import express from "express"
import { createNewUser, getAuthenticatedUser, getUserById, updateUser } from "../controllers/UserController.js";
import { createCatalog, deleteCatalog, getAllCatalogs, getCatalogById } from "../controllers/CatalogController.js";
const router = express.Router();

/* GET users listing. */
router.get('/me', getAuthenticatedUser);

router.get('/:id', getUserById);

router.post('/new', createNewUser)

router.put('/', updateUser);

router.get('/catalog', getAllCatalogs)

router.get('/catalog/:id', getCatalogById);

router.post('/catalog/', createCatalog)

router.delete('/catalog/:id', deleteCatalog)


// router.delete('/')
export default router;