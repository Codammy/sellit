import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/ItemController.js";

const router = Router()

router.get('/');

router.get('/:id')

router.delete('/:id');

router.post('/sellit')

router.post('/facebook')

router.post('/twitter')

router.post('/google')

export default router