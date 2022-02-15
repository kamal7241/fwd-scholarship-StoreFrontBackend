import { asyncHandlerWrapper } from './../util/asyncErrorHandler';
import Clinet from "../database";
import { ResonseError } from '../util/ResponseError';
import { ErrorStatus , OrderStatus } from '../constants';
export interface Order {
    status?:OrderStatus,
    userid:number,
}
export interface OrderDataBase extends Order{
    id:number
}
export class OrderStore  {
    async index():Promise<OrderDataBase[]>{
        return  await asyncHandlerWrapper<OrderDataBase[]>(async ():Promise<OrderDataBase[]>=>{
            const connection = await Clinet.connect();
            const query = `SELECT * FROM orders`
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))
    }
    async show(id:number):Promise<OrderDataBase>{
      return  await asyncHandlerWrapper<OrderDataBase>(async ():Promise<OrderDataBase>=>{
            const connection = await Clinet.connect();
            const query = `SELECT * FROM orders WHERE id=$1`
            const res = await connection.query(query , [id]);
            connection.release();
            return res.rows[0];
        } , new ResonseError(ErrorStatus.NotFound , "can`t get order"))
    }
    async create(order:Order):Promise<OrderDataBase>{
        return await asyncHandlerWrapper<OrderDataBase>(async ()=>{
            const connection = await Clinet.connect();
            const query = `INSERT INTO orders(userid) VALUES($1) RETURNING *`
            const res = await connection.query(query , [order.userid]);
            connection.release();
            return res.rows[0];
        } , new ResonseError(ErrorStatus.BadRequest , "cant Create order"))
    }
    async delete(id:number):Promise<OrderDataBase>{
        return await asyncHandlerWrapper<OrderDataBase>(async ()=>{
            const connection = await Clinet.connect();
            const query = `DELETE FROM  orders WHERE id=$1 RETURNING *`
            const res = await connection.query(query , [id]);
            connection.release();
            return res.rows[0];
        } , new ResonseError(ErrorStatus.BadRequest , "cant delete order"))
    }
    async update(order:OrderDataBase):Promise<OrderDataBase>{
        return await asyncHandlerWrapper<OrderDataBase>(async ()=>{
            const connection = await Clinet.connect();
            const query = `UPDATE orders SET status= $1 WHERE id=$2 RETURNING *`
            const res = await connection.query(query , [order.status , order.id]);
            connection.release();
            return res.rows[0]; 
            } , new ResonseError(ErrorStatus.BadRequest , "cant update order"))
    }
}