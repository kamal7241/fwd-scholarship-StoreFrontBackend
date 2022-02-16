import Clinet from '../database';
import { ResonseError } from '../util/ResponseError';
import { ErrorStatus } from '../constants';
export interface User {
    firstname: string;
    lastname: string;
    password: string;
}
export interface UserDataBase extends User {
    id: number;
}

export class UserStore {
    async index(): Promise<UserDataBase[]> {
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM users`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't get users ${e}`)
        }
    }
    async show(id: number): Promise<UserDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `SELECT * FROM users WHERE id=$1`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't get user ${e}`)
        }
    }
    async create(user: User): Promise<UserDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `INSERT INTO users(firstname , lastname , password) VALUES($1,$2,$3) RETURNING *`;
            const res = await connection.query(query, [
                user.firstname,
                user.lastname,
                user.password,
            ]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't Create user ${e}`)
        }
    }
    async delete(id: number): Promise<UserDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  users WHERE id=$1 RETURNING *`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't delete user ${e}`)
        }
    }
    async deleteAll(): Promise<UserDataBase[]> {
        try {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  users RETURNING *`;
            const res = await connection.query(query);
            connection.release();
            return res.rows;
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't delete user ${e}`)
        }
    }
    async update(user: UserDataBase): Promise<UserDataBase> {
        try {
            const connection = await Clinet.connect();
            const query = `UPDATE users SET firstname= $1 , lastname= $2 , password= $3 WHERE id=$4 RETURNING *`;
            const res = await connection.query(query, [
                user.firstname,
                user.lastname,
                user.password,
                user.id,
            ]);
            connection.release();
            return res.rows[0];
        } catch (e) {
            throw new ResonseError(ErrorStatus.NotFound, `can't update user ${e}`)
        }
    }
}
