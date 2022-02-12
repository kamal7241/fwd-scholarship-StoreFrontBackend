import express from "express";
import addProductRoutes from "./productRoutes";

const addAppRoutes = (app : express.Application)=>{
    app.use('/api/products' , addProductRoutes())
}
export default addAppRoutes;