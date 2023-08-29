import { Router } from "express";
import { getCart } from "../controllers/cartController";
import { isAuth } from "../middlewares/isAuth";

const router: Router = Router();

router.get('/', isAuth, getCart);

export default router;