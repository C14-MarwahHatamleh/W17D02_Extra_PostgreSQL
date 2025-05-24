CREATE DATABASE shippingCompany;


CREATE TABLE users(
    id SERIAL NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT,
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    is_deleted SMALLINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE products (
id SERIAL NOT NULL,
title  VARCHAR(255),
img VARCHAR(255),
category VARCHAR(255),
price INT,
is_deleted SMALLINT DEFAULT 0,
PRIMARY KEY (id)
);


CREATE TABLE orders (
id SERIAL NOT NULL,
shipping_date TIMESTAMP DEFAULT NOW(),
created_at  TIMESTAMP DEFAULT NOW(),
LOWER(shipping_status) VARCHAR(255) DEFAULT "pending",
 user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
is_deleted SMALLINT DEFAULT 0,
 PRIMARY KEY (id)
);



CREATE TABLE order_items(
id SERIAL NOT NULL,
quantity INT,
order_id INT,
created_at  TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
product_id INT,
FOREIGN KEY (product_id) REFERENCES products(id),
is_deleted SMALLINT DEFAULT 0,
PRIMARY KEY (id)
);

