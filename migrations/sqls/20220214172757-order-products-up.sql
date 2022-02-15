CREATE TABLE IF NOT EXISTS order_products (
    id serial PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);