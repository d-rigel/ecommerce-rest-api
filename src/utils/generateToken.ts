import jwt from "jsonwebtoken"
import { config } from "../configs/config";

export const generateToken = (payload: object) => {
    return jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: '10h' });
}