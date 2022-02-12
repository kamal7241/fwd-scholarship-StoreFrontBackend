import express, { Request ,  Response } from "express";
import { Router } from "express";
const userRoutes = Router();
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
const addUserRoutes = ():Router=>{
    userRoutes.get('/' , index );
    userRoutes.get('/:id' , show );
    userRoutes.post('/' , create );
    userRoutes.delete('/' , destroy );
    userRoutes.delete('/:id' , deleteProduct );
    userRoutes.put('/:id' , update );
    return userRoutes;
}
export default addUserRoutes;