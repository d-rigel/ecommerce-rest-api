import { NextFunction, Response } from "express";
import { verifyToekn } from "../utils/verifyToken";
import { getToken } from "../utils/getToken";
import { IError, IRequest } from "../types";

export const isAuth: any= ( req: IRequest, res: Response, next: NextFunction ) => {
    const token =  getToken(req);
    console.log("token>> is auth", token)
    const payload = verifyToekn(token);
    if(!payload){
        const err: IError = new Error('Invalid/expired token! Please Login agian!');
        err.statusCode = 422;        
        throw(err);
    }
    req.userAuth = payload;
    next();   
}

export const isAdmin: any = ( req: IRequest, res: Response, next: NextFunction ) => {
    if(req.userAuth.role !== 1){
        const err: IError = new Error('access denied! Admin Only!');
        err.statusCode = 400;
        throw(err); 
    }
    next();
}