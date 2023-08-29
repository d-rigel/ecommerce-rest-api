import { Request } from "express";
import Cart from "../models/cartModel";

export const findAllCart = () => {
    return Cart.find();
}

