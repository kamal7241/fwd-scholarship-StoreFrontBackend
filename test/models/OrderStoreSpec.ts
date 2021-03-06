import { UserStore } from '../../src/models/UserStore';
import { OrderStatus } from '../../src/constants/index';
import { OrderStore, OrderDataBase, Order } from '../../src/models/OrderStore';
describe('order store suite', () => {
    const store = new OrderStore();
    beforeAll( async ()=>{
        await store.deleteAll()
        await new UserStore().deleteAll()
    })
    let orderId: number;
    let createOrder: Order;
    let updateOrder: OrderDataBase;
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a empty orders', async () => {
        const products = await store.index();
        expect(products).toEqual([]);
    });
    it('create should return a order', async () => {
        const userStore = new UserStore();
        const user = await userStore.create({
            firstname: 'kamal',
            lastname: 'korney',
            password: '123',
        });
        createOrder = {
            userid: user.id,
        };
        const { id, ...order } = (await store.create(
            createOrder
        )) as OrderDataBase;
        orderId = id;
        expect(order).toEqual({ ...createOrder, status: OrderStatus.active });
        expect(id).toBeDefined();
    });
    it('update should return a updated order values', async () => {
        updateOrder = {
            id: orderId,
            status: OrderStatus.complete,
            userid: createOrder.userid,
        };
        const updatedProduct = (await store.update(
            updateOrder
        )) as OrderDataBase;
        expect(updateOrder).toEqual(updatedProduct);
    });
    it('delete should remove created order', async () => {
        const deletedProduct = (await store.delete(orderId)) as OrderDataBase;
        expect(deletedProduct).toEqual(updateOrder);
    });
});
