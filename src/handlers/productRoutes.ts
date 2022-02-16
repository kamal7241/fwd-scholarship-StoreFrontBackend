import { authorizationMw } from '../../src/middlewares/authenticationMW';
import {
    ProductStore,
    ProductDataBase,
    Product,
} from '../../src/models/ProductStore';
import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
const productRouter = Router();
const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await new ProductStore().index();
        res.json({ data: products });
    } catch (error) {
        next(error);
    }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await new ProductStore().show(parseInt(req.params.id));
        res.json({ data: product });
    } catch (error) {
        next(error);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    const prod = req.body;
    try {
        const product = await new ProductStore().create(prod);
        res.json({ data: product });
    } catch (error) {
        next(error);
    }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
    const prod = req.body as Product;
    const updateproduct: ProductDataBase = {
        ...prod,
        id: parseInt(req.params.id),
    };
    try {
        const product = await new ProductStore().update(updateproduct);
        res.json({ data: product });
    } catch (error) {
        next(error);
    }
};
const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await new ProductStore().delete(
            parseInt(req.params.id)
        );
        res.json({ data: product });
    } catch (error) {
        next(error);
    }
};
const destroy = (_req: Request, res: Response) => {
    // todo add remove all
    res.json('destroy all');
};
const addProductRoutes = (): Router => {
    productRouter.get('/', index);
    productRouter.get('/:id', show);
    productRouter.post('/', authorizationMw, create);
    productRouter.delete('/', destroy);
    productRouter.delete('/:id', deleteProduct);
    productRouter.put('/:id', update);
    return productRouter;
};
export default addProductRoutes;
