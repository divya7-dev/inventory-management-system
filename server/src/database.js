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

export async function deleteStocks(stockId) {
  try {
    const query = `
      DELETE FROM stocks WHERE id = ?
    `;
    const values = [stockId];

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

export async function deleteCustomers(customerId) {
  try {
    const queryInvoices = `
      DELETE FROM invoices WHERE customer_id = ?
    `;
    await pool.query(queryInvoices, [customerId]);

    const queryCustomers = `
      DELETE FROM customers WHERE id = ?
    `;
    await pool.query(queryCustomers, [customerId]);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// invoices
export async function getInvoices() {
  try {
    const [data] = await pool.query(`
      SELECT invoices.date, invoices.invoice_number, customers.name, invoices.price
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.id
    `);
    return data.map((row) => ({
      ...row,
      date: new Date(row.date + "Z"), // Ensure UTC timezone
    }));
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addInvoices(invoiceData) {
  try {
    const currentDateUTC = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `
      INSERT INTO invoices (date, invoice_number, customer_id, price)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      currentDateUTC,
      invoiceData.invoice_number,
      invoiceData.customer_id,
      invoiceData.price,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateInvoices(invoiceData) {
  try {
    const query = `
      UPDATE invoices SET invoice_number = ?, customer_id = ?, price = ?
      WHERE id = ?
    `;
    const values = [
      invoiceData.invoice_number,
      invoiceData.customer_id,
      invoiceData.price,
      invoiceData.id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function deleteInvoices(invoiceId) {
  try {
    const query = `
      DELETE FROM invoices WHERE id = ?
    `;

    await pool.query(query, [invoiceId]);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// vendors
export async function getVendors() {
  try {
    const [data] = await pool.query(`
            SELECT * FROM vendors
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addVendors(vendorData) {
  try {
    const query = `
      INSERT INTO vendors (name, email, contact_number, address)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      vendorData.name,
      vendorData.email,
      vendorData.contact_number,
      vendorData.address,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateVendors(vendorData) {
  try {
    const query = `
      UPDATE vendors SET name = ?, email = ?, contact_number = ?, address = ?
      WHERE id = ?
    `;
    const values = [
      vendorData.name,
      vendorData.email,
      vendorData.contact_number,
      vendorData.address,
      vendorData.id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function deleteVendors(vendorId) {
  try {
    // const queryInvoices = `
    //   DELETE FROM vendors WHERE customer_id = ?
    // `;
    // await pool.query(queryInvoices, [customerId]);

    const queryVendors = `
      DELETE FROM vendors WHERE id = ?
    `;
    await pool.query(queryVendors, [vendorId]);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
