import { Request, Response, NextFunction } from "express";
import { errorResponse } from "./responseHandler";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err.message;
    if(!err.statusCode){
        err.statusCode = 500;
    }
    res.status(err.statusCode).json(errorResponse(null, err.statusCode, message));
}