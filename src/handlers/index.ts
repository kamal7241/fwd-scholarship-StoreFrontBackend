import express, { NextFunction, Request , Response } from "express";
import addProductRoutes from "./productRoutes";
import addOrderRoutes from "./orderRoutes";
import addUserRoutes from "./userRoutes";
import { ErrorMessage } from "../util/ErrorMessage";
const addAppRoutes = (app : express.Application)=>{
    app.use('/api/products' , addProductRoutes())
    app.use('/api/orders' , addOrderRoutes())
    app.use('/api/users' , addUserRoutes())
    app.use("*" , (req:Request , res:Response)=>{
        throw new ErrorMessage(404 , "sorry Not Found");
    })
    app.use((err:ErrorMessage,_req:Request,res:Response , _next:NextFunction) => {
        res.status(err.status).json({errors : err.message});
      })
}
export default addAppRoutes;