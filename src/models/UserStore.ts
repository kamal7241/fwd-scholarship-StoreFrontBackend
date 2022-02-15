import { asyncHandlerWrapper } from './../util/asyncErrorHandler';
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
        return await asyncHandlerWrapper<UserDataBase[]>(
            async (): Promise<UserDataBase[]> => {
                const connection = await Clinet.connect();
                const query = `SELECT * FROM users`;
                const res = await connection.query(query);
                connection.release();
                return res.rows;
            },
            new ResonseError(ErrorStatus.NotFound, 'can`t get users')
        );
    }
    async show(id: number): Promise<UserDataBase> {
        return await asyncHandlerWrapper<UserDataBase>(
            async (): Promise<UserDataBase> => {
                const connection = await Clinet.connect();
                const query = `SELECT * FROM users WHERE id=$1`;
                const res = await connection.query(query, [id]);
                connection.release();
                return res.rows[0];
            },
            new ResonseError(ErrorStatus.NotFound, 'can`t get user')
        );
    }
    async create(user: User): Promise<UserDataBase> {
        return await asyncHandlerWrapper<UserDataBase>(async () => {
            const connection = await Clinet.connect();
            const query = `INSERT INTO users(firstname , lastname , password) VALUES($1,$2,$3) RETURNING *`;
            const res = await connection.query(query, [
                user.firstname,
                user.lastname,
                user.password,
            ]);
            connection.release();
            return res.rows[0];
        }, new ResonseError(ErrorStatus.BadRequest, 'cant Create user'));
    }
    async delete(id: number): Promise<UserDataBase> {
        return await asyncHandlerWrapper<UserDataBase>(async () => {
            const connection = await Clinet.connect();
            const query = `DELETE FROM  users WHERE id=$1 RETURNING *`;
            const res = await connection.query(query, [id]);
            connection.release();
            return res.rows[0];
        }, new ResonseError(ErrorStatus.BadRequest, 'cant delete user'));
    }
    async update(user: UserDataBase): Promise<UserDataBase> {
        return await asyncHandlerWrapper<UserDataBase>(async () => {
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
        }, new ResonseError(ErrorStatus.BadRequest, 'cant update user'));
    }
}
