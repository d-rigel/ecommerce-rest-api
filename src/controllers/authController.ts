import { Request, Response, NextFunction } from "express";
import { successResponse } from "../middlewares/errorHandlers/responseHandler";
import { createUser, loginUser } from "../services/userService";
import { generateToken } from "../utils/generateToken";

export const register = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const { newUser, err } = await createUser(req);
        if(err){
            throw err;
        };
        res.status(201).json(
            successResponse(
                {},
                'register success!',
                201
            )
        );
    }catch(err: any){
        next(err);
    }
}

export const login = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        const { user, err } = await loginUser(req);
        if(err){
            throw(err);
        }
        const token = await generateToken({id: user._id, role: user.role});
        const data = {
            name: user.user_name,
            email: user.email,
            roll: user.role,
            token: "Bearer " + token
        }
        res.status(200).json(
            successResponse(
                data,
                'login successful',
                200
            )
        );
    }catch(err: any){
        next(err);
    }
}