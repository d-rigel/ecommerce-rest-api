import { Request, Response, NextFunction } from "express";
import { successResponse } from "../middlewares/errorHandlers/responseHandler";
import { findAllCart } from "../services/cartService";
import { IError } from "../types";

export const getCart: any = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
       const cart = await findAllCart();
       if(!cart){
            const err: IError = new Error('cart not found!');
            err.statusCode = 404;
            throw(err); 
       }

       res.status(201).json(
            successResponse(
                cart,
                'success',
                200
            )
        );

    }catch(err: any){
        next(err);
    }
}

