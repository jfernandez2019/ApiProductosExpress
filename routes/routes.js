import express from 'express';
import { createProduct, viewAllProducts, editOneProduct, deleteOneProducts } from '../controller/products_controller.js'

const router = express();
//define las rutas
router.get('/productos', viewAllProducts);
router.post('/productos', createProduct);
router.put('/productos/:id', editOneProduct);
router.delete('/productos/:id', deleteOneProducts);

export default router;