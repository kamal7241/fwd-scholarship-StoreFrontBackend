import { asyncHandlerWrapper } from './../util/asyncErrorHandler';
import Clinet from '../database';
import { ResonseError } from '../util/ResponseError';
import { ErrorStatus } from '../constants';
export interface Product {
    name: string;
    price: number;
    category: string;
}
export interface ProductDataBase extends Product {
    id: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        return await asyncHandlerWrapper<ProductDataBase[]>(
            async (): Promise<ProductDataBase[]> => {
                const connection = await Clinet.connect();
                const query = `SELECT * FROM products`;
                const res = await connection.query(query);
                connection.release();
                return res.rows;
            },
            new ResonseError(ErrorStatus.NotFound, 'can`t get Products')
        );
    }
    async show(id: number): Promise<Product> {
        return await asyncHandlerWrapper<ProductDataBase>(
            async (): Promise<ProductDataBase> => {
                const connection = await Clinet.connect();
                const query = `SELECT * FROM products WHERE id=$1`;
                const res = await connection.query(query, [id]);
                connection.release();
                return res.rows[0];
            },
            new ResonseError(ErrorStatus.NotFound, 'can`t get Product')
        );
    }
    async create(product: Product): Promise<ProductDataBase> {
        return await asyncHandlerWrapper<ProductDataBase>(async () => {
            const connection = await Clinet.connect();
            const query = `INSERT INTO products(name , price , category) VALUES($1,$2,$3) RETURNING *`;
            const res = await connection.query(query, [
                product.name,
                product.price,
                product.category,
            ]);
            connection.release();
            return res.rows[0];
        }, new ResonseError(ErrorStatus.BadRequest, 'cant Create Product'));
    }
    async delete(id: number): Promise<ProductDataBase> {
        return await asyncHandlerWrapper<ProductDataBase>(async () => {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  products WHERE id=$1 RETURNING *`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        }, new ResonseError(ErrorStatus.BadRequest, 'cant delete Product'));
    }
    async deleteAll(): Promise<ProductDataBase[]> {
        return await asyncHandlerWrapper<ProductDataBase[]>(async () => {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  products RETURNING *`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        }, new ResonseError(ErrorStatus.BadRequest, 'cant delete Products'));
    }
    async update(product: ProductDataBase): Promise<ProductDataBase> {
        return await asyncHandlerWrapper<ProductDataBase>(async () => {
            const connection = await Clinet.connect();
            const query = `UPDATE products SET name= $1 , price= $2 , category= $3 WHERE id=$4 RETURNING *`;
            const res = await connection.query(query, [
                product.name,
                product.price,
                product.category,
                product.id,
            ]);
            connection.release();
            return res.rows[0];
        }, new ResonseError(ErrorStatus.BadRequest, 'cant update Product'));
    }
}
