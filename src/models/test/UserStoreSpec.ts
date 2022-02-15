import { UserStore, UserDataBase, User } from './../UserStore';

describe('user store suite', () => {
    const store = new UserStore();
    let userId: number;
    let postUser: User;
    let updateUser: UserDataBase;
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a empty users', async () => {
        const products = await store.index();
        expect(products).toEqual([]);
    });
    it('create should return a user', async () => {
        postUser = {
            firstname: 'kamal',
            lastname: 'korney',
            password: '123456',
        };
        const { id, ...user } = (await store.create(postUser)) as UserDataBase;
        userId = id;
        expect(user).toEqual(postUser);
        expect(id).toBe(1);
    });
    it('update should return a updated user values', async () => {
        updateUser = {
            id: userId,
            firstname: 'mohamed',
            lastname: 'hussein',
            password: 'asdasd',
        };
        const updatedUser = (await store.update(updateUser)) as UserDataBase;
        expect(updateUser).toEqual(updatedUser);
    });
    it('delete should remove created user', async () => {
        const deletedUser = (await store.delete(userId)) as UserDataBase;
        expect(deletedUser).toEqual(updateUser);
    });
});
