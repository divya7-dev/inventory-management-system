import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

var pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// stocks
export async function getStocks() {
  try {
    const [data] = await pool.query(`
            SELECT * FROM stocks
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addStocks(stockData) {
  try {
    const query = `
      INSERT INTO stocks (item_name, part_number, opening_stocks, stocks_on_hand, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      stockData.item_name,
      stockData.part_number,
      stockData.opening_stocks,
      stockData.stocks_on_hand,
      stockData.price,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateStocks(stockData) {
  try {
    const query = `
      UPDATE stocks SET item_name = ?, part_number = ?, opening_stocks = ?, stocks_on_hand = ?, price = ?
      WHERE id = ?
    `;
    const values = [
      stockData.item_name,
      stockData.part_number,
      stockData.opening_stocks,
      stockData.stocks_on_hand,
      stockData.price,
      stockData.id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// customers
export async function getCustomers() {
  try {
    const [data] = await pool.query(`
            SELECT * FROM customers
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addCustomers(customerData) {
  try {
    const query = `
      INSERT INTO customers (name, email, contact_number, address)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      customerData.name,
      customerData.email,
      customerData.contact_number,
      customerData.address,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateCustomers(customerData) {
  try {
    const query = `
      UPDATE customers SET name = ?, email = ?, contact_number = ?, address = ?
      WHERE id = ?
    `;
    const values = [
      customerData.name,
      customerData.email,
      customerData.contact_number,
      customerData.address,
      customerData.id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
