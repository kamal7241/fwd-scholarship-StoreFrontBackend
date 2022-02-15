import { OrderStore } from './../models/OrderStore';
import { OrderProductsStore , OrderProduct } from './../services/dashboard/OrderProductsStore';
import { UserStore, UserDataBase , User } from './../models/UserStore';
import  { Request ,  Response , NextFunction } from "express";
import { Router } from "express";
const userRoutes = Router();
const index = async (_req : Request , res:Response , next:NextFunction)=>{
    try {
        const users = await new UserStore().index()
        res.json({data: users});
         } catch (error) {
        next(error)
    }
}
const show = async (req : Request , res:Response , next:NextFunction)=>{
    try {
        const user = await new UserStore().show(parseInt(req.params.id))
        res.json({data: user});
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req : Request , res:Response , next:NextFunction)=>{
    try {
        const userOrder = req.body;
        const {products , ...order} = userOrder;
        const userId = parseInt(req.params.id);
        const createdOrder  = await new OrderStore().create({...order , userid:userId});
        await new OrderProductsStore().addProduct({product_id:products[0].id , order_id:createdOrder.id , quantity:products[0].quantity});
        const resOrder = await new OrderProductsStore().getUserOrder(userId , createdOrder.id);
        res.json({data: {...resOrder}});
    } catch (error) {
        next(error)
    }
}
const addProductToOrder = async (req : Request , res:Response , next:NextFunction)=>{
    try {
        const {quantity , product_id} = req.body;
        const userId = parseInt(req.params.id);
        const orderId = parseInt(req.params.orderId);
        const prodOrder:OrderProduct = {order_id : orderId , quantity:quantity , product_id:product_id}; 
        const createdOrder  = await new OrderProductsStore().addProduct(prodOrder);
        res.json({data: createdOrder});
    } catch (error) {
        next(error)
    }
}
const getUserOrders = async (req : Request , res:Response , next:NextFunction)=>{
    try {
        const userId = parseInt(req.params.id)
        const user = await new OrderProductsStore().getUserOrders(userId)
        res.json({data: user});
    } catch (error) {
        next(error)
    }
}
const getUserOrder = async (req : Request , res:Response , next:NextFunction)=>{
    try {
        const userId = parseInt(req.params.id)
        const orderId = parseInt(req.params.orderId)
        const user = await new OrderProductsStore().getUserOrder(userId , orderId)
        res.json({data: user});
    } catch (error) {
        next(error)
    }
}
const create = async( req : Request , res:Response , next:NextFunction)=>{
    const user = req.body;
    try {
        const createdUser = await new UserStore().create(user)
        res.json({data: createdUser});
    } catch (error) {
        next(error)
    }
}
const update = async(req : Request , res:Response, next:NextFunction)=>{
    const user = (req.body) as User;
    const updateUser:UserDataBase = {...user , id: parseInt(req.params.id)}
    try {
        const newUpdated = await new UserStore().update(updateUser)
        res.json({data: newUpdated});
    } catch (error) {
        next(error)
    }
}
const deleteProduct = async(req : Request , res:Response, next:NextFunction)=>{
    try {
        const user = await new UserStore().delete(parseInt(req.params.id))
        res.json({data: user});
    } catch (error) {
        next(error)
    }
}
const destroy = async(_req : Request , res:Response)=>{
    //todo
    res.json("destroy all");
}
const addUserRoutes = ():Router=>{
    userRoutes.get('/' , index );
    userRoutes.post('/:id/orders' , createOrder );
    userRoutes.get('/:id/orders/:orderId' , getUserOrder );
    userRoutes.get('/:id/orders' , getUserOrders );
    userRoutes.get('/:id' , show );
    userRoutes.post('/' , create );
    userRoutes.post('/:id/orders/:orderId/products' , addProductToOrder );
    userRoutes.delete('/' , destroy );
    userRoutes.delete('/:id' , deleteProduct );
    userRoutes.put('/:id' , update );
    return userRoutes;
}
export default addUserRoutes;