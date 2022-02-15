import { asyncHandlerWrapper } from './../../util/asyncErrorHandler';
import { ResonseError } from './../../util/ResponseError';
import { ErrorStatus } from './../../constants/index';
import { Order } from './../../models/OrderStore';
import Client from '../../database';
export interface OrderProduct {
   product_id:number ,
   order_id:number ,
   quantity:number
}

export interface OrderProductDataBase extends OrderProduct{
    id:number
}


export class OrderProductsStore  {
    async addProduct(product:OrderProduct): Promise<Order> {
        return  await asyncHandlerWrapper<Order>(async ():Promise<Order>=>{
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const connection = await Client.connect()
            const res = await connection.query(sql, [product.quantity, product.order_id, product.product_id])
            connection.release();
            console.log(res.rows);
            return res.rows[0]
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))

      }
      async addMultiProduct(products:OrderProduct[]): Promise<Order> {
          const values = products.map(product => {
                return `('${product.quantity}' ,'${product.order_id}', '${product.product_id}' )`
          })
        return  await asyncHandlerWrapper<Order>(async ():Promise<Order>=>{
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES${values.join(',')} RETURNING *`
            const connection = await Client.connect()
            const res = await connection.query(sql)
            connection.release();
            console.log(res.rows);
            return res.rows[0]
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))

      }
      async getUserOrders(userId:number): Promise<Order[]> {
        return  await asyncHandlerWrapper<Order[]>(async ():Promise<Order[]>=>{
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.userid=$1 '
            // const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.userid WHERE users.id=$1 '
            // const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id  WHERE orders.userid=$1'
            const connection = await Client.connect()
            const res = await connection.query(sql , [userId])
            connection.release();
            console.log(res.rows);
            return res.rows;
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))

      }
      async getUserOrder(userId:number , orderId:number): Promise<Order[]> {
        return  await asyncHandlerWrapper<Order[]>(async ():Promise<Order[]>=>{
            const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.userid=$1 AND orders.id=$2 '
            // const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.userid WHERE users.id=$1 '
            // const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id  WHERE orders.userid=$1'
            const connection = await Client.connect()
            const res = await connection.query(sql , [userId , orderId])
            connection.release();
            console.log(res.rows);
            return res.rows[0];
        } , new ResonseError(ErrorStatus.NotFound , "can`t get orders"))

      }

}

