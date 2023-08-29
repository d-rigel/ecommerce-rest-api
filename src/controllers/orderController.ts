import { Response, NextFunction } from "express";
import { successResponse } from "../middlewares/errorHandlers/responseHandler";
import { IRequest } from "../types";
import { createAnOrder, deleteOrderByUser, getOrderById, getOrders, updateOrderByUser } from "../services/orderService";

export const createOrder:any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { newOrder, err } = await createAnOrder(req);
        if(err){
            throw err;
        }
        res.status(201).json(
            successResponse(
                newOrder,
                'successfully order created!',
                200
            )
        );
    }catch(err: any){
        next(err);
    }
}

export const getAllOrders: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { orders, err } = await getOrders();
        if(err){
            throw err; 
        }
        res.status(200).json(
            successResponse(
                orders,
                'getting orders successfully',
                200
            )
        );
    }catch(err: any){
        next(err);
    }    
}

export const getOrder: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { order, err } = await getOrderById(req.params.id);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                order,
                'Get order successful',
                200
            )
        );
    } catch (err: unknown) {
        next(err);
    }
}

export const updateOrder: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try{
        const { updateOrder, err }: any = await updateOrderByUser(req);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                updateOrder,
                'Order is successfully updated!',
                200
            )
        );
    }catch(err: unknown){
        next(err);
    }
}

export const deleteOrder: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { deletedOrder, err }: any = await deleteOrderByUser(req);
        if(err){
            throw err;
        }
        res.status(200).json(
            successResponse(
                {},
                'order is successfully deleted!',
                200
            )
        );
    } catch (err: unknown) {
        next(err);
    }
}

export const orderConfirm: any = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { order, err }: any = await getOrderById(req.params.id);
        if(err || order.confirm_status){
            const error =  err? err : new Error('Order is already confirmed by Admin!');
            throw error;
        }
        order.confirm_status = true;
        await order.save();

        res.status(200).json(
            successResponse(
                order,
                'Order successfully confirmed!',
                200
            )
        );

    } catch(err: unknown) {
        next(err);
    }
}