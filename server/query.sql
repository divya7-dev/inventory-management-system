-- Create stocks table --
CREATE TABLE stocks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100),
    part_number VARCHAR(100),
    opening_stocks INT,
    stocks_on_hand INT,
    price FLOAT(8, 2)
)

-- Insert dummy data into stocks table --
INSERT INTO stocks(item_name, part_number, opening_stocks, stocks_on_hand, price)
VALUES 
    ('Apple', 'A1', 50, 40, 49),
    ('Biscuit', 'B2', 400, 340, 30.5),
    ('Maggie', 'M3', 30, 25, 12),
    ('Pillow', 'P4', 10, 3, 200.85),
    ('Bucket', 'B5', 32, 23, 250)

-- Create customers tabls --
CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    contact_number VARCHAR(100),
    address VARCHAR(200)
)

-- Insert dummy data into customers table --
INSERT INTO customers(name, contact_number, email, address)
VALUES
    ("Test Customer", "8375667548", "sanudivya7@gmail.com", "xx, yyy, zzz")
