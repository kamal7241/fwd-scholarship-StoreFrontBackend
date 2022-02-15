import express, { NextFunction, Request, Response } from 'express';
import addProductRoutes from './productRoutes';
import addOrderRoutes from './orderRoutes';
import addUserRoutes from './userRoutes';
import { ResonseError } from '../util/ResponseError';
const addAppRoutes = (app: express.Application) => {
    app.use('/api/products', addProductRoutes());
    app.use('/api/orders', addOrderRoutes());
    app.use('/api/users', addUserRoutes());
    app.use('*', (_req: Request, _res: Response) => {
        throw new ResonseError(404, 'sorry Not Found');
    });
    app.use(
        (
            err: ResonseError,
            _req: Request,
            res: Response,
            _next: NextFunction
        ) => {
            res.status(err.status).json({ errors: err.message });
        }
    );
};
export default addAppRoutes;
