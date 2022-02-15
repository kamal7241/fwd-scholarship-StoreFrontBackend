import { UserStore } from './../../../models/UserStore';
import { OrderStore , Order } from './../../../models/OrderStore';
import { OrderProductsStore } from './../OrderProductsStore';
import { ProductStore } from '../../../models/ProductStore';

fdescribe('OrderProduct Store suite',  () => {

    const store = new OrderProductsStore();
    it('should have addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('add product should return added product to order ', async () => {
        const user = await new UserStore().create({
            firstname:'kamal',
            lastname:'asd',
            password:'1245'
        })
        const product = await new ProductStore().create({name:'testProduct' , price:50 , category:'testCategory'});
        const order = await new OrderStore().create({
            userid: user.id
        });
        const orders =  await store.addProduct({order_id:order.id , product_id:product.id , quantity: 20 }) as Order;
        expect(orders).not.toEqual(orders);
    });
});