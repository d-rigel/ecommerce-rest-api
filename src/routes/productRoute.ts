import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, addToCart, getProductById } from "../controllers/prodcutController";
import { isAdmin, isAuth } from "../middlewares/isAuth";

const router: Router = Router();

router.get('/', getAllProducts );
router.get('/:id', getProductById );
router.post('/', isAuth, isAdmin, createProduct);
router.patch('/:id', isAuth, isAdmin, updateProduct);
router.delete('/:id', isAuth, isAdmin, deleteProduct);
router.post('/cart', isAuth, addToCart);

export default router;