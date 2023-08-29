import Poroduct from "../models/productModel";
import User from "../models/userModel";
import { IError, IRequest } from "../types";

export const findAllProduct = async () => {
    return await Poroduct.find();
}

export const findProductById = async (_id: string) => {
    try {
        const product = await Poroduct.findById({_id});
        if(!product){
            const err: IError = new Error('Product not found!');
            err.statusCode = 404;
            throw err;
        }
        return { product, undefined };
    } catch (err: unknown) {
        return { undefined, err }; 
    }
}

export const findProudctAndUpdate = async ( req: IRequest ) => {
    const productId = req.params.id;
    const body = req.body;
    const updatedProduct = await Poroduct.findByIdAndUpdate(productId,body);
    if(!updatedProduct){
        const err: IError = new Error('Something went wrong in product-updating process!');
        err.statusCode = 500;
        return { undefined, err };
    }
    return { updatedProduct, undefined };
}

export const findProudctAndDelete = async ( id: string ) => {
    const deletedProduct = await Poroduct.findByIdAndDelete(id);
    if(!deletedProduct){
        const err: IError = new Error('Something went wrong in product-deleting process!');
        return { undefined, err };
    }
    return { deletedProduct, undefined };
}

export const addToCartService =async (req:IRequest) => {
    const _id = req.userAuth.id;
    const productId = req.body.product_id;
    const productQuantity = req.body.quantity;
    const user:any = await User.findById({_id});
    let cartProducts = user?.cart.products;
    const existingProductIndex = cartProducts.findIndex(
        (product: any) => product.product_id.toString() === productId
    );
    const product = await Poroduct.findById(productId);
    if (existingProductIndex > -1) {
        cartProducts[existingProductIndex].quantity += productQuantity || 1;
        user.cart.products = cartProducts;
        await user.save();
    }else {
        const newProduct = {
            product_id: productId,
            quantity: productQuantity || 1,
            price: product?.price
        }
        user.cart.products.push(newProduct);
        await user.save();
    }
    if(!user){
        const err: IError = new Error('Something went wrong in add-to-cart process!');
        err.statusCode = 500;
        return { undefined, err };
    }
    const cart = user.cart.products;
    return { cart, undefined };
}

