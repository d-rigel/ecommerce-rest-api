import { Schema, model } from "mongoose";
import { ICart } from "./cartModel";
import { IAddress } from "./addressModel";

export interface IOrder {
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address_id: IAddress,
    products: ICart[],
    total_price: number,
    confirm_status: boolean
}

const orderShcema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address_id: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: Number,
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total_price: {
        type: Number,
        required: true
    },
    confirm_status: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Order = model<IOrder>('Order', orderShcema);
export default Order;
