import { Router } from "express";
import { login, register } from "../controllers/authController";

const router: Router = Router();

router.post('/signin', login);
router.post('/signup', register);

export default router;
