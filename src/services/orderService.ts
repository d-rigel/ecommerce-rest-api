import Address from "../models/addressModel";
import Order from "../models/orderModel";
import User from "../models/userModel";
import { IError, IRequest } from "../types";

export const getOrders = async () => {
    try {
        // paginate to return 5 item per page
         const pageNumber = 1;
         const itemsPerPage = 5;

        const skipAmount = (pageNumber - 1) * itemsPerPage;
       // Filter criteria
       const filter = { total_price: { $gte: 2000 } };

       // Sort options
        const sortOptions: any = { total_price: 1 };
        const orders = await Order
                                 .find(filter)         
                                 .sort(sortOptions)    
                                 .skip(skipAmount)     
                                .limit(itemsPerPage);
      

        if(!orders){
            const err: IError = new Error('Something went wrong in getting Orders!');
            err.statusCode = 500;
            throw err;
        }
        return { orders, undefined };
    }catch(err: unknown){
        return { undefined, err };
    }
}

export const getOrderById = async (_id: string) => {
    try {
        const order = await Order.findById({_id});
        if(!order){
            const err: IError = new Error('Order not found!');
            err.statusCode = 404;
            throw err;
        }
        return { order, undefined };
    } catch (err: unknown) {
        return { undefined, err };
    }
}

export const createAddress = async (body: any, user_id: string) => {
    const {
        name, phone, street, city, township
    } = body;
    try {   
        const address = {
            street, city, township
        };
        const newAddress = new Address({
            user_id,
            name,
            phone,
            address
        });
        if(!newAddress){
            const err: IError = new Error('You need to fill name, address or phone number!');
            err.statusCode = 403;
            throw err;
        }
        await newAddress.save();
        return { newAddress, undefined };

    }catch(error: unknown){
        return { undefined, error };
    }
}

export const createAnOrder = async (req: IRequest) => {
    const user_id = req.userAuth.id;
    try {
        const user: any = await User.findById(user_id);
        const cartProducts: any = user.cart.products;
        if(cartProducts.length < 1){
            const err: IError = new Error('there is any product in cart!');
            err.statusCode = 400;
            throw err;
        }
        let total_price = 0;
        cartProducts.map((product: any) => {
            total_price += ( product.price * product.quantity );
        });

        const { newAddress, error } = await createAddress(req.body, req.userAuth.id);        
        if(error){
            throw error;
        }

        const newOrder = new Order({
            user_id,
            address_id: newAddress?._id,
            products: cartProducts,
            total_price
        });

        if(!newOrder){
            const err: IError = new Error('Something went wrong in creating new Order!');
            err.statusCode = 500;
            throw err;
        }
        await newOrder.save();
        user.cart.products = [];
        await user.save();
        return { newOrder, undefined };

    } catch (err: any) {
        return { undefined, err };
    }
}

export const isOrderConfirm = async (order: any)=> {
    if(!order){
        return undefined;
    }
    if(order.confirm_status){
        const err: IError = new Error("Can't access to do anything, Order is already confirmed!");
        err.statusCode = 403;
        return err;
    };
}

export const updateOrderByUser = async ( req: IRequest ) => {
    const body = req.body;
    try {
        const { order, err } = await getOrderById(req.params.id);
        const orderConfirmed = await isOrderConfirm(order);
        if(err || orderConfirmed){
            throw orderConfirmed? orderConfirmed : err;
        }
        const { newAddress, error } = await createAddress(body,req.userAuth.id);
        if(error){
            throw error;
        }

        await Address.findByIdAndDelete(order?.address_id);

        // order?.address_id = newAddress?._id;
        // await order?.save();
        return { order, undefined };

    }catch(err: unknown){
        return { undefined, err };
    }
}

export const deleteOrderByUser = async ( req: IRequest ) => {
    const body = req.body;
    try {
        const { order, err } = await getOrderById(req.params.id);
        const orderConfirmed = await isOrderConfirm(order);
        if(err || orderConfirmed){
            throw orderConfirmed? orderConfirmed : err;
        }
        await Address.findByIdAndDelete({_id:order?.address_id});
        await Order.findOneAndDelete({_id: order?._id});
        return { order, undefined };
    } catch (err: unknown) {
        return { undefined, err };
    }
}





