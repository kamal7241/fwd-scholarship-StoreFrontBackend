import { ProductStore, Product, ProductDataBase } from './../ProductStore';

describe('Product store suite', () => {
    const store = new ProductStore();
    let productId: number;
    let postProduct: Product;
    let updateProduct: ProductDataBase;
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
        const { id, ...product } = (await store.create(
            postProduct
        )) as ProductDataBase;
        productId = id;
        expect(product).toEqual(postProduct);
        expect(productId).toBe(1);
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
