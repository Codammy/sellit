import { Router } from "express";
import { createStore, getAllStores, getStoreById, updateStore, deleteStore } from "../controllers/StoreController.js";

const router = Router()

router.get('/', getAllStores);

router.get('/:id', getStoreById)

router.post('/', createStore)

router.put('/:id', updateStore)

router.delete('/:id', deleteStore);

export default router