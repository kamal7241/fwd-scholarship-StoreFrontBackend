CREATE TABLE IF NOT EXISTS orders( 
    id serial PRIMARY KEY , status order_status DEFAULT 'active' );