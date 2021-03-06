import supertest from "supertest"
import { ErrorStatus , ErrorMessages } from './../../src/constants/index';
import { app } from '../../src/server';
import { UserStore } from '../../src/models/UserStore';
import { Product, ProductDataBase  } from '../../src/models/ProductStore';

const req = supertest(app);
describe('product handlers suite', () => {
    const userStore = new UserStore()
    beforeAll(async()=>{
        await userStore.deleteAll();
    })
    let token:string;
    let createdProd:ProductDataBase;
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
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
         token = loginRes.body.token;
        const postProduct:Product = {
                price: 100,
                name: 'shampo',
                category: 'cleaner',
        }
        const res = await req.post('/api/products').set('Authorization', 'bearer ' + token).send(postProduct)
        createdProd = res.body.data as ProductDataBase;
         const {id:_id , ...resProduct} = createdProd;
        expect(res.status).toBe(200);
        expect(resProduct).toEqual(postProduct);
    });
    it('expect get a product with id and token to return success ', async() => {
        const res = await req.get(`/api/products/${createdProd.id}`).set('Authorization', 'bearer ' + token)
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual(createdProd);
    });
});