import express, { Request ,  Response } from "express";
import { Router } from "express";
const productRouter = Router();
const index = (_req : Request , res:Response)=>{
    res.json("get all products");
}
const show = (_req : Request , res:Response)=>{
    res.json("get an product");
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
const addProductRoutes = ():Router=>{
    productRouter.get('/' , index );
    productRouter.get('/:id' , show );
    productRouter.post('/' , create );
    productRouter.delete('/' , destroy );
    productRouter.delete('/:id' , deleteProduct );
    productRouter.put('/:id' , update );
    return productRouter;
}
export default addProductRoutes;