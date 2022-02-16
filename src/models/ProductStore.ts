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
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM products`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't get Products ${e}`)
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM products WHERE id=$1`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't get Product ${e}`)
        }
    }
    async create(product: Product): Promise<ProductDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `INSERT INTO products(name , price , category) VALUES($1,$2,$3) RETURNING *`;
            const res = await connection.query(query, [
                product.name,
                product.price,
                product.category,
            ]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't create Product ${e}`)
        }
    }
    async delete(id: number): Promise<ProductDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  products WHERE id=$1 RETURNING *`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't delete Product ${e}`)
        }
    }
    async deleteAll(): Promise<ProductDataBase[]> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  products RETURNING *`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't delete Products ${e}`)
        }
    }
    async update(product: ProductDataBase): Promise<ProductDataBase> {
        try {
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
        } catch (e) {
            throw new ResonseError(ErrorStatus.BadRequest, `can't update Product ${e}`)
        }
    }
}