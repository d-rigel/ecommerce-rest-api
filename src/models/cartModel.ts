import { Schema, model } from "mongoose";

export interface ICart {
    user_id?: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        product_id: Schema.Types.ObjectId,
        quantity: number,
        ref: 'Product'
    }
}

const cartSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        },
    }]
});

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
