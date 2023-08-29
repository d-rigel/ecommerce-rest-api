import { Request } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { IError } from "../types";

export const createUser = async ( req: Request ) => {
    const isUserAlreadyExited = await User.findOne({email: req.body.email});
    if(isUserAlreadyExited) {
        const err: IError = new Error('User already exist with this email!');
        err.statusCode = 403;
        return { undefined, err };
    };
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(req.body.password, salt);
    const {
        password, confirm_password, ...redcueBody
    } = body;
    const newBody = {
        ...redcueBody,
        password: hashPw
    };
    const newUser = new User(newBody);
    await newUser.save();
    if(!newUser){
        const err: IError = new Error('Creating User process failed!');
        err.statusCode = 500;
        return { undefined, err };
    };
    return { newUser, undefined };
}

export const loginUser = async ( req: Request ) => {
    const body = req.body;
    const user = await User.findOne({email: body.email});
    const same = await bcrypt.compare(body.password, user?.password || "");
    if(!user || !same){
        const err: IError = new Error('email does not found or password is wrong!');
        err.statusCode = 403;
        return {undefined, err};
    }
    return {user, undefined};
}