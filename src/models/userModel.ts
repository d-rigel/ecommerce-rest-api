import { Schema, model } from "mongoose";
import { ICart } from "./cartModel";

export interface IUser {
    user_name: string,
    email: string,
    password: string,
    phone?: string,
    role?: number,
    cart?: ICart[]
}

const userSchema: Schema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        products: [{
            product_id:{
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            price: Number,
            quantity: Number
        }]
    }
});

const User = model<IUser>('User', userSchema);
export default User;
