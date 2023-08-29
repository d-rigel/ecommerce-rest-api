import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth";
import { createOrder, deleteOrder, getOrder, getAllOrders, orderConfirm, updateOrder } from "../controllers/orderController";

const router: Router = Router();


router.get('/', isAuth, getAllOrders);
router.get('/:id', isAuth, getOrder);
router.post('/', isAuth, createOrder);
router.patch('/:id', isAuth, updateOrder);
router.delete('/:id', isAuth, deleteOrder);
router.post('/confirm/:id', isAuth, isAdmin, orderConfirm);

export default router;