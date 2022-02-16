import { ProductStore, Product, ProductDataBase } from './../ProductStore';

describe('Product store suite', () => {
    const store = new ProductStore();
    beforeAll(async ()=>{
        await store.deleteAll()
    })
    let productId: number;
    let postProduct: Product;
    let updateProduct: ProductDataBase;
    let created:ProductDataBase;
    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a empty products', async () => {
        const products = await store.index();
        expect(products).toEqual([]);
    });

    it('create should return a product', async () => {
        postProduct = {
            price: 100,
            name: 'shampo',
            category: 'cleaner',
        };
         created  = (await store.create(
            postProduct
        )) as ProductDataBase;
        const { id, ...product } = created;
        productId = id;
        expect(product).toEqual(postProduct);
        expect(productId).toBeDefined();
    });
    it('show should return created product', async () => {
        const product = await store.show(created.id);
        expect(product).toEqual(created);
    });
    it('update should return a updated product values', async () => {
        updateProduct = {
            id: productId,
            price: 200,
            name: 'shampo',
            category: 'cleaner',
        };
        const updatedProduct = (await store.update(
            updateProduct
        )) as ProductDataBase;
        expect(updateProduct).toEqual(updatedProduct);
    });
    it('delete should remove created product', async () => {
        const deletedProduct = (await store.delete(
            productId
        )) as ProductDataBase;
        expect(deletedProduct).toEqual(updateProduct);
    });
});
