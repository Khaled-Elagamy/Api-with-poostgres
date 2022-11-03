CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(64) NOT NULL,
    product_descrip VARCHAR(255) NOT NULL,
    price integer NOT NULL
);