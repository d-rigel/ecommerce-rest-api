import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../configs/config";

export const verifyToekn = ( token: any ) => {
    const decodedPayload = jwt.verify(token || "", config.JWT_SECRET_KEY);
    console.log("decodedPayload", decodedPayload)
    if(!decodedPayload){
        return false;
    }

    return decodedPayload;
}