import { Response, NextFunction } from "express";
import { addToCartService, findAllProduct, findProductById, findProudctAndDelete, findProudctAndUpdate } from "../services/productService";
import { successResponse } from "../middlewares/errorHandlers/responseHandler";
import Poroduct, { IProduct } from "../models/productModel";
import { IError, IRequest } from "../types";

export const getAllProducts: any = async ( req: IRequest, res: Response, next: NextFunction ) => {
    try {
        const products = await findAllProduct();
        res.status(200).json(successResponse<IProduct[]>(
            products,
            'success',
            200
        ));
    }catch(err: any){
        next(err);
    }
}

export const getProductById: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { product, err } = await findProductById(req.params.id);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                product,
                'get product successful',
                200
            )
        );
    } catch( err: unknown ) {
        next(err);
    }
}

export const createProduct: any = async ( req: IRequest, res: Response, next: NextFunction ) => {
    const body = req.body;
    try{
        const newProduct = new Poroduct(body);
        await newProduct.save();
        
        if(!newProduct){
            const err: IError = new Error('cannot create product!');
            err.statusCode = 400;
            throw(err);
        }

        res.status(201).json(
            successResponse<IProduct>(
                newProduct,
                'product create successfully!',
                201
            )
        );

    }catch(err: any){
        next(err);
    }
}

export const updateProduct: any = async ( req: IRequest, res: Response, next: NextFunction ) => {
    try{
        const { updatedProduct, err } = await findProudctAndUpdate(req);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                {},
                `Product is successully deleted with this id = ${updatedProduct._id}`,
                200
            )
        );
    }catch(err: any){
        next(err);
    }
}

export const deleteProduct:any = async ( req: IRequest, res: Response, next: NextFunction ) => {
    const productId = req.params.id;
    try {        
        const { deletedProduct, err } = await findProudctAndDelete(productId);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                {},
                `Product is successully deleted with this id = ${deletedProduct._id}`,
                200
            )
        )

    }catch(err: any){
        next(err);
    }
}

export const addToCart:any = async ( req: IRequest, res: Response, next: NextFunction ) => {
    try{
        const { cart, err } = await addToCartService(req);
        if(err) {
            throw err;
        }
        res.status(201).json(
            successResponse(
            {},
            'cart added successfully!',
            201
            )
        );
    }catch(err: any){
        next(err);
    }
}