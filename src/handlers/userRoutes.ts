import { ProductStore } from './../models/ProductStore';
import { authorizationMw } from './../middlewares/authenticationMW';
import { createToken } from './../util/index';
import { Order, OrderStore } from './../models/OrderStore';
import {
    OrderProductsStore,
    OrderProduct,
    OrderproductsDataBase,
} from './../services/dashboard/OrderProductsStore';
import { UserStore, UserDataBase, User } from './../models/UserStore';
import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { encrypt } from '../util';
import { authenticationMw } from '../middlewares/authenticationMW';
export interface OrderDetails extends Order {
    products: { quantity: number; id: number }[];
}
export interface OrderDetailsResponse extends Order {
    products: OrderproductsDataBase[];
}
const userRoutes = Router();
const index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await new UserStore().index();
        res.json({ data: users });
    } catch (error) {
        next(error);
    }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await new UserStore().show(parseInt(req.params.id));
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userOrder = req.body as OrderDetails;
        userOrder.userid = parseInt(req.params.id);
        const createdOrder = await new OrderStore().create(userOrder);
        const orderProductStore = new OrderProductsStore();
        await orderProductStore.addProduct({
            product_id: userOrder.products[0].id,
            order_id: createdOrder.id,
            quantity: userOrder.products[0].quantity,
        });
        const products = await orderProductStore.getOrderProducts(
            createdOrder.id
        );
        const responseOrder = { ...createdOrder, products };
        res.json({ data: responseOrder });
    } catch (error) {
        next(error);
    }
};
const addProductToOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { quantity, product_id } = req.body;
        const orderId = parseInt(req.params.orderId);
        const prodOrder: OrderProduct = {
            order_id: orderId,
            quantity: quantity,
            product_id: product_id,
        };
        const createdOrder = await new OrderProductsStore().addProduct(
            prodOrder
        );
        res.json({ data: createdOrder });
    } catch (error) {
        next(error);
    }
};
const getUserOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = parseInt(req.params.id);
        const orders = (await new OrderProductsStore().getUserOrders(
            userId
        )) as OrderDetailsResponse[];
        orders.forEach(async (order: OrderDetailsResponse) => {
            const products = await new OrderProductsStore().getOrderProducts(
                order.userid
            );
            order.products = products;
        });
        for (let i = 0; i < orders.length; i++) {
            const products = await new OrderProductsStore().getOrderProducts(
                orders[i].userid
            );
            orders[i].products = products;
        }
        res.json({ data: orders });
    } catch (error) {
        next(error);
    }
};
const getUserOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = parseInt(req.params.id);
        const orderId = parseInt(req.params.orderId);
        const user = await new OrderProductsStore().getUserOrder(
            userId,
            orderId
        );
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as User;
    user.password = encrypt(user.password);
    try {
        const createdUser = await new UserStore().create(user);
        res.json({ data: createdUser });
    } catch (error) {
        next(error);
    }
};
const login = async (req: Request, res: Response) => {
    const user = req.body as User;
    const { firstname, lastname } = user;
    res.json({
        success: true,
        token: createToken({ firstname, lastname }),
    });
};
const update = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as User;
    const updateUser: UserDataBase = { ...user, id: parseInt(req.params.id) };
    try {
        const newUpdated = await new UserStore().update(updateUser);
        res.json({ data: newUpdated });
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
        const user = await new UserStore().delete(parseInt(req.params.id));
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};
const destroy = async (_req: Request, res: Response) => {
    //todo
    res.json('destroy all');
};
const addUserRoutes = (): Router => {
    userRoutes.get('/', authorizationMw, index);
    userRoutes.post('/login', authenticationMw, login);
    userRoutes.post('/register', create);
    userRoutes.post('/', authorizationMw, create);
    userRoutes.post('/:id/orders', authorizationMw , createOrder);
    userRoutes.get('/:id/orders/:orderId', authorizationMw , getUserOrder);
    userRoutes.get('/:id/orders' , authorizationMw , getUserOrders);
    userRoutes.get('/:id', authorizationMw, show);
    userRoutes.post('/:id/orders/:orderId/products', addProductToOrder);
    userRoutes.delete('/', destroy);
    userRoutes.delete('/:id', deleteProduct);
    userRoutes.put('/:id', update);
    return userRoutes;
};
export default addUserRoutes;
