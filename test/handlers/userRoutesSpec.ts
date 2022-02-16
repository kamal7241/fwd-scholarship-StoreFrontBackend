import { OrderDetails } from './../../src/handlers/userRoutes';
import { ErrorStatus , OrderStatus , ErrorMessages} from './../../src/constants/index';
import { app } from '../../src/server';
import { Product, ProductDataBase  , ProductStore } from '../../src/models/ProductStore';
import { OrderDetailsResponse } from '../../src/handlers/userRoutes';
import supertest from "supertest"
import { UserStore } from '../../src/models/UserStore';

const req = supertest(app);
describe('user handlers suite', () => {
    const userStore = new UserStore()
    const prodStore = new ProductStore()
    beforeEach(async ()=>{
        await userStore.deleteAll();
        await prodStore.deleteAll();
    })
    it('expect login with valid user to return token', async() => {
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const res = await req.post('/api/users/login').send(user);
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
    it('expect login with inValid user to return Not Authenticated error message', async() => {
        await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const res = await req.post('/api/users/login').send({firstname:'wrongname' , lastname:'korney' , password:'123'});
        expect(res.status).toBe(ErrorStatus.NotAuthorized);
        expect(res.body.errors).toBe(ErrorMessages.NotAuthenticated);
    });
    it('expect getting all users without token to return not authorized message', async() => {
        const res = await req.get('/api/users');
        expect(res.status).toBe(ErrorStatus.NotAuthorized);
        expect(res.body.errors).toEqual(ErrorMessages.NotAuthorized);
    });
    it('expect getting all users to have only our main user', async() => {
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
        const token = loginRes.body.token;
        const res = await req.get('/api/users').set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body.data[0]).toEqual(user);
    });
    it('expect adding a new user to be success', async() => {
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
        const token = loginRes.body.token;
        const res = await req.post('/api/users').set('Authorization', 'bearer ' + token)
        .send({firstname:'newUser' , lastname:'test' , password:'123'});
        expect(res.status).toBe(200);
        expect(res.body.data.firstname).toEqual('newUser');
    });
    it('expect adding a new order to user to be success', async() => {
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
        const token = loginRes.body.token;
        const postProduct:Product = {price: 100,name: 'shampo', category: 'cleaner',}
        const prodRes = await req.post('/api/products').send(postProduct).set('Authorization', 'bearer ' + token)
        const prod:ProductDataBase = prodRes.body.data; 
        const order:OrderDetails = {userid:user.id , products:[{quantity:20 , id:prod.id} ]}
        const res = await req.post(`/api/users/${user.id}/orders`).set('Authorization', 'bearer ' + token)
        .send(order);
        expect(res.status).toBe(200);
        expect((res.body.data as OrderDetailsResponse).status).toEqual(OrderStatus.active);
    });
    it('expect getting orders to a user to be success', async() => {
        const user = await userStore.create({firstname:'kamal' , lastname:'korney' , password:'123'});
        const loginRes = await req.post('/api/users/login').send(user);
        const token = loginRes.body.token;
        const postProduct:Product = {price: 100,name: 'test prod', category: 'cleaner',}
        const prodRes = await req.post('/api/products').send(postProduct).set('Authorization', 'bearer ' + token)
        const prod:ProductDataBase = prodRes.body.data; 
        const order:OrderDetails = {userid:user.id , products:[{quantity:20 , id:prod.id} ]}
        await req.post(`/api/users/${user.id}/orders`).set('Authorization', 'bearer ' + token)
        .send(order);
        const res = await req.get(`/api/users/${user.id}/orders`).set('Authorization', 'bearer ' + token)
        expect(res.status).toBe(200);
        expect((res.body.data as OrderDetailsResponse[])[0].status).toEqual(OrderStatus.active);
    });
});