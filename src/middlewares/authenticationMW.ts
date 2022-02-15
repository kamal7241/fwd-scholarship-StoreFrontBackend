import { ResonseError } from './../util/ResponseError';
import { ErrorMessages, ErrorStatus } from './../constants/index';
import { isPasswordMatchHashed, verifyToken } from './../util/index';
import { User } from './../models/UserStore';
import { NextFunction, Request, Response } from 'express';
import Client from '../database';
export const authenticationMw = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.body as User;
    const query = `SELECT password FROM users WHERE firstname=$1`;
    const connection = await Client.connect();
    const result = await connection.query(query, [user.firstname]);
    connection.release();
    if (result.rows.length) {
        if (isPasswordMatchHashed(user.password, result.rows[0].password))
            next();
        next(
            new ResonseError(
                ErrorStatus.NotAuthorized,
                ErrorMessages.NotAuthenticated
            )
        );
    }
    next(
        new ResonseError(
            ErrorStatus.NotAuthorized,
            ErrorMessages.NotAuthenticated
        )
    );
};

export const authorizationMw = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const tokenHeader = req.headers.authorization as string;
    if (!tokenHeader)
        throw new ResonseError(
            ErrorStatus.NotAuthorized,
            ErrorMessages.NotAuthorized
        );
    const token = (tokenHeader.split(' ') as string[])[1] as string;
    if (verifyToken(token)) next();
    else
        throw new ResonseError(
            ErrorStatus.NotAuthorized,
            ErrorMessages.NotAuthorized
        );
};
