DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    date date NOT NULL,
    note text NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE orders_products (
    PRIMARY KEY (order_id, product_id)
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
    quantity integer NOT NULL
);