import { OrderStore , Order , OrderDataBase} from './../models/OrderStore';
import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { authorizationMw } from '../middlewares/authenticationMW';
const orderRouter = Router();
const index = async (_req: Request, res: Response , next:NextFunction) => {
    try {
        const orders = await new OrderStore().index();
        res.json({ data: orders });
    } catch (error) {
        next(error);
    }
};
const show = async(req: Request, res: Response , next:NextFunction) => {

    try {
        const order = await new OrderStore().show(parseInt(req.params.id));
        res.json({ data: order });
    } catch (error) {
        next(error);
    }
};
const create = async(req: Request, res: Response , next:NextFunction) => {
    const reqorder = req.body as Order ;
    try {
        const order = await new OrderStore().create(reqorder);
        res.json({ data: order });
    } catch (error) {
        next(error);
    }
};
const update = async(req: Request, res: Response , next:NextFunction) => {
    const ord = req.body as Order;
    const updateOrder: OrderDataBase = {
        ...ord,
        id: parseInt(req.params.id),
    };
    try {
        const product = await new OrderStore().update(updateOrder);
        res.json({ data: product });
    } catch (error) {
        next(error);
    }
};
const deleteProduct = async(req: Request, res: Response , next:NextFunction) => {
    try {
        const deletedOrd = await new OrderStore().delete(
            parseInt(req.params.id)
        );
        res.json({ data: deletedOrd });
    } catch (error) {
        next(error);
    }
};
const destroy = async(_req: Request, res: Response , next:NextFunction) => {
    try {
        const deletedOrds = await new OrderStore().deleteAll();
        res.json({ data: deletedOrds });
    } catch (error) {
        next(error);
    }
};
const addOrderRoutes = (): Router => {
    orderRouter.get('/' , authorizationMw, index);
    orderRouter.get('/:id',authorizationMw, show);
    orderRouter.post('/', authorizationMw, create);
    orderRouter.delete('/',authorizationMw, destroy);
    orderRouter.delete('/:id',authorizationMw, deleteProduct);
    orderRouter.put('/:id',authorizationMw, update);
    return orderRouter;
};
export default addOrderRoutes;
