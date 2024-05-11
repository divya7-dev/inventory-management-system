-- Create stocks table --
CREATE TABLE stocks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100),
    part_number VARCHAR(100),
    opening_stocks INT,
    stocks_on_hand INT,
    price FLOAT(8, 2)
);

-- Create customers table --
CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    contact_number VARCHAR(100),
    address VARCHAR(200)
);

-- Create invoices table --
CREATE TABLE invoices(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    invoice_number VARCHAR(100),
    customer_id INT,
    price FLOAT(8, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Create vendors table --
CREATE TABLE vendors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    contact_number VARCHAR(100),
    address VARCHAR(200)
);

-- Create bills table --
CREATE TABLE bills(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    bill_number VARCHAR(100),
    vendor_id INT,
    price FLOAT(8, 2),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

-- Drop price column from invoices table --
ALTER TABLE invoices DROP COLUMN price;

-- Add new columns to invoices table --
ALTER TABLE invoices 
    ADD item_id INT,
    ADD items_count INT,
    ADD CONSTRAINT FOREIGN KEY(item_id) REFERENCES stocks(id);

-- Drop price column from bills table --
ALTER TABLE bills DROP COLUMN price;

-- Add new columns to bills table --
ALTER TABLE bills 
    ADD item_id INT,
    ADD items_count INT,
    ADD CONSTRAINT FOREIGN KEY(item_id) REFERENCES stocks(id);

-- Add price column to invoices table --
ALTER TABLE invoices ADD price FLOAT(8, 2);