import { ProductDataBase } from './../../models/ProductStore';
import { asyncHandlerWrapper } from './../../util/asyncErrorHandler';
import { ResonseError } from './../../util/ResponseError';
import { ErrorStatus } from './../../constants/index';
import { Order } from './../../models/OrderStore';
import Client from '../../database';
import { Product } from '../../models/ProductStore';
export interface OrderProduct {
   product_id:number ,
   order_id:number ,
   quantity:number
}

export interface OrderProductDataBase extends OrderProduct{
    id:number
}

export interface OrderproductsDataBase extends Product {
  quantity : number
}
export class OrderProductsStore  {
    async addProduct(product:OrderProduct): Promise<Order> {
        return  await asyncHandlerWrapper<Order>(async ():Promise<Order>=>{
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const connection = await Client.connect()
            const res = await connection.query(sql, [product.quantity, product.order_id, product.product_id])
            connection.release();
            return res.rows[0]
        } , new ResonseError(ErrorStatus.NotFound , "can`t add product to order or order not exist"))

      }
      async getUserOrders(userId:number): Promise<Order[]> {
        return  await asyncHandlerWrapper<Order[]>(async ():Promise<Order[]>=>{
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.userid=$1 '
            // const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.userid WHERE users.id=$1 '
            // const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id  WHERE orders.userid=$1'
            const connection = await Client.connect()
            const res = await connection.query(sql , [userId])
            connection.release();
            return res.rows;
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))

      }
      async getUserOrder(userId:number , orderId:number): Promise<Order[]> {
        return  await asyncHandlerWrapper<Order[]>(async ():Promise<Order[]>=>{
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.userid=$1 AND orders.id=$2 '
            // const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.userid WHERE users.id=$1 '
            // const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id  WHERE orders.userid=$1'
            const connection = await Client.connect();
            const res = await connection.query(sql , [userId , orderId]);
            connection.release();
            return res.rows[0];
        } , new ResonseError(ErrorStatus.NotFound , "can`t get order"))

      }

      async getOrderProducts(orderId:number): Promise<OrderproductsDataBase[]> {
        return  await asyncHandlerWrapper<OrderproductsDataBase[]>(async ():Promise<OrderproductsDataBase[]>=>{
            const sql = 'SELECT * FROM products INNER JOIN order_products ON order_products.product_id = products.id WHERE order_products.order_id = $1;'
            const connection = await Client.connect();
            const res = await connection.query(sql , [orderId]);
            connection.release();
            return res.rows;
        } , new ResonseError(ErrorStatus.NotFound , "can`t get order"))

      }


}

