-- Create the database
DROP DATABASE IF EXISTS team19;
CREATE DATABASE IF NOT EXISTS team19;
-- Use the database
USE team19;

-- Create the table for users
CREATE TABLE IF NOT EXISTS admin (
	ID INT PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
 
-- Create the table for products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price INT ,
    roast_level VARCHAR(255),
    image TEXT,
    country varchar(255)
);
 
INSERT INTO products (product_name, price, roast_level, image,country)
VALUES
    ('Italian', 9.99, 'Light roasted', 'image1.jpg','Europe'),
    ('Italian', 7.77, 'Dark roasted', 'image2.jpg','America'),
    ('Morocha', 14, 'Medium roasted', 'image3.jpg','America');
    
INSERT INTO admin (ID, username, fname, lname, password)
VALUES
    (1,'admin1','John', 'Doe', '0000'),
    (2,'admin2','Jane', 'Smith', '1111'),
    (3,'admin3','Michael', 'Johnson', '2222');
    