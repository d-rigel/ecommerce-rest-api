import { Schema, model } from "mongoose";

interface ICategory {
    category: Schema.Types.ObjectId,
    ref: 'Category',
}

export interface IProduct {
    title: string,
    description: string,
    image?: string,
    brand?: string,
    price: number,
    category: ICategory,
    stock_status: string,
    stock?: number,
}

const productSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        reuqird: true,
        default:0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    stock_status: {
        type: String,
        enum: ['auto', 'instock', 'outOfStock'],
        default: 'auto'
    },
    stock: {
        type: Number,
    },
}, {timestamps: true});
   
const Poroduct = model<IProduct>('Product', productSchema);

export default Poroduct;