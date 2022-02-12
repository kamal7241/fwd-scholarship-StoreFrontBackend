import express, { Request ,  Response } from "express";
import { Router } from "express";
const orderRouter = Router();
const index = (_req : Request , res:Response)=>{
    res.json("get all ");
}
const show = (_req : Request , res:Response)=>{
    res.json("get 1 ");
}
const create = (_req : Request , res:Response)=>{
    res.json("create");
}
const update = (_req : Request , res:Response)=>{
    res.json("update");
}
const deleteProduct = (_req : Request , res:Response)=>{
    res.json("delete 1");
}
const destroy = (_req : Request , res:Response)=>{
    res.json("destroy all");
}
const addOrderRoutes = ():Router=>{
    orderRouter.get('/' , index );
    orderRouter.get('/:id' , show );
    orderRouter.post('/' , create );
    orderRouter.delete('/' , destroy );
    orderRouter.delete('/:id' , deleteProduct );
    orderRouter.put('/:id' , update );
    return orderRouter;
}
export default addOrderRoutes;