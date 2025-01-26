import express from "express"
import { createNewUser, getAuthenticatedUser, getUserById, updateUser, verifyEmail, requestEmailVerify } from "../controllers/UserController.js";
import { createCatalog, removeFromCatalog, getAllCatalogs  } from "../controllers/CatalogController.js";
import { passwordResetRequest, resetPassword, resetPasswordPage } from "../controllers/AuthController.js";
const router = express.Router();

/* GET users listing. */

router.get('/catalog', getAllCatalogs)

router.post('/catalog', createCatalog)

router.delete('/catalog/:id', removeFromCatalog)

router.get('/me', getAuthenticatedUser);

router.post('/new', createNewUser)

router.put('/', updateUser);

router.put('/verify-email', verifyEmail);

router.get('/request-email-verify', requestEmailVerify);

router.get('/forgot-password', passwordResetRequest);

router.get('/password-reset/:token', resetPasswordPage)

router.post ('/reset-password', resetPassword);

router.get('/:id', getUserById);

export default router;