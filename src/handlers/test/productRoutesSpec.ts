import { UserStore } from './../../models/UserStore';
import { ErrorMessages } from './../../constants/index';
import { Product, ProductDataBase } from './../../models/ProductStore';
import supertest from "supertest"
import { app } from "../../server";
import { ErrorStatus } from '../../constants';
const req = supertest(app);
describe('product handlers suite', () => {
    it('expect getting all products to be empty', async() => {
        const res = await req.get('/api/products');
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
    });
    it('expect create a products without token to return not authorized message ', async() => {
        const postProduct:Product = {
                price: 100,
                name: 'shampo',
                category: 'cleaner',
        }
        const res = await req.post('/api/products')
        .send(postProduct)
        expect(res.status).toBe(ErrorStatus.NotAuthorized);
        expect(res.body.errors).toEqual(ErrorMessages.NotAuthorized);
    });

    it('expect create a products to return our product', async() => {
        const userStore = new UserStore()
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
        const token = loginRes.body.token;
        const postProduct:Product = {
                price: 100,
                name: 'shampo',
                category: 'cleaner',
        }
        const res = await req.post('/api/products').set('Authorization', 'bearer ' + token).send(postProduct)
        const {id:_id , ...resProduct} = res.body.data as ProductDataBase;
        expect(res.status).toBe(200);
        expect(resProduct).toEqual(postProduct);
    });
});