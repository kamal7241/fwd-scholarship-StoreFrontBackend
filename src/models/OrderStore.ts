import Clinet from '../database';
import { ResonseError } from '../util/ResponseError';
import { ErrorStatus, OrderStatus } from '../constants';
export interface Order {
    status?: OrderStatus;
    userid: number;
}
export interface OrderDataBase extends Order {
    id: number;
}
export class OrderStore {
    async index(): Promise<OrderDataBase[]> {
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM orders`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't get orders ${e}`)
        }
    }
    async show(id: number): Promise<OrderDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM orders WHERE id=$1`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't get order ${e}`)
        }
    }
    async create(order: Order): Promise<OrderDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `INSERT INTO orders(userid) VALUES($1) RETURNING *`;
            const res = await connection.query(query, [order.userid]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't create order ${e}`)
        }
    }
    async delete(id: number): Promise<OrderDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  orders WHERE id=$1 RETURNING *`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't delete order ${e}`)
        }
    }
    async deleteAll(): Promise<OrderDataBase[]> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM orders RETURNING *`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't delete orders ${e}`)
        }
    }
    async update(order: OrderDataBase): Promise<OrderDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `UPDATE orders SET status= $1 WHERE id=$2 RETURNING *`;
            const res = await connection.query(query, [order.status, order.id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't update order ${e}`)
        }
    }
}
