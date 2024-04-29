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
            SELECT * FROM stocks ORDER BY id DESC
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
      stockData.opening_stocks,
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
    const openingStocksDifference =
      stockData.opening_stocks - (await getOpeningStocks(stockData.id));
    const updatedStocksOnHand =
      (await getStocksOnHand(stockData.id)) + openingStocksDifference;

    updateStocksOnHand(stockData.id, updatedStocksOnHand);

    const query = `
      UPDATE stocks SET item_name = ?, part_number = ?, opening_stocks = ?, price = ?
      WHERE id = ?
    `;
    const values = [
      stockData.item_name,
      stockData.part_number,
      stockData.opening_stocks,
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
    await pool.query(
      `
      DELETE FROM stocks WHERE id = ?
    `,
      [stockId],
    );
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function getStocksDropdown() {
  try {
    const [data] = await pool.query(`
            SELECT id, item_name AS name FROM stocks ORDER BY id DESC
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}


// customers
export async function getCustomers() {
  try {
    const [data] = await pool.query(`
            SELECT * FROM customers ORDER BY id DESC
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

export async function getCustomersDropdown() {
  try {
    const [data] = await pool.query(`
            SELECT id, name FROM customers ORDER BY id DESC
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// invoices
export async function getInvoices() {
  try {
    const [data] = await pool.query(`
      SELECT invoices.date, invoices.invoice_number, customers.name AS customer_name, stocks.item_name, invoices.items_count
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.id
      INNER JOIN stocks ON invoices.item_id = stocks.id
      ORDER BY invoices.id DESC
    `);
    return data.map((row) => ({
      ...row,
      date: new Date(row.date + "Z"),
    }));
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addInvoices(invoiceData) {
  try {
    const updatedStocksOnHand =
      (await getStocksOnHand(invoiceData.item_id)) - invoiceData.items_count;
    await updateStocksOnHand(invoiceData.item_id, updatedStocksOnHand);

    const currentDateUTC = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `
      INSERT INTO invoices (date, invoice_number, customer_id, item_id, items_count)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      currentDateUTC,
      invoiceData.invoice_number,
      invoiceData.customer_id,
      invoiceData.item_id,
      invoiceData.items_count,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateInvoices(invoiceData) {
  try {
    const updatedStocksOnHand =
      (await getStocksOnHand(invoiceData.item_id)) - invoiceData.items_count;
    await updateStocksOnHand(invoiceData.item_id, updatedStocksOnHand);

    const invoicesQuery = `
      UPDATE invoices SET invoice_number = ?, customer_id = ?, item_id = ?, items_count = ?
      WHERE id = ?
    `;
    const values = [
      invoiceData.invoice_number,
      invoiceData.customer_id,
      invoiceData.item_id,
      invoiceData.items_count,
      invoiceData.id,
    ];

    await pool.query(invoicesQuery, values);
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
            SELECT * FROM vendors ORDER BY id DESC
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
    const queryBills = `
      DELETE FROM bills WHERE vendor_id = ?
    `;
    await pool.query(queryBills, [vendorId]);

    const queryVendors = `
      DELETE FROM vendors WHERE id = ?
    `;
    await pool.query(queryVendors, [vendorId]);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function getVendorsDropdown() {
  try {
    const [data] = await pool.query(`
            SELECT id, name FROM vendors ORDER BY id DESC
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// bills
export async function getBills() {
  try {
    const [data] = await pool.query(`
      SELECT bills.date, bills.bill_number, vendors.name AS vendor_name, stocks.item_name, bills.items_count
      FROM bills
      INNER JOIN vendors ON bills.vendor_id = vendors.id
      INNER JOIN stocks ON bills.item_id = stocks.id
      ORDER BY bills.id DESC
    `);
    return data.map((row) => ({
      ...row,
      date: new Date(row.date + "Z"),
    }));
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function addBills(billData) {
  try {
    const updatedOpeningStocks =
      (await getOpeningStocks(billData.item_id)) + billData.items_count;
    await updateOpeningStocks(billData.item_id, updatedOpeningStocks);

    const updatedStocksOnHand =
      (await getStocksOnHand(billData.item_id)) + billData.items_count;
    await updateStocksOnHand(billData.item_id, updatedStocksOnHand);

    const currentDateUTC = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `
      INSERT INTO bills (date, bill_number, vendor_id, item_id, items_count)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      currentDateUTC,
      billData.bill_number,
      billData.vendor_id,
      billData.item_id,
      billData.items_count,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function updateBills(billData) {
  try {
    const updatedOpeningStocks =
      (await getOpeningStocks(billData.item_id)) + billData.items_count;
    await updateOpeningStocks(billData.item_id, updatedOpeningStocks);

    const updatedStocksOnHand =
      (await getStocksOnHand(billData.item_id)) + billData.items_count;
    await updateStocksOnHand(billData.item_id, updatedStocksOnHand);

    const query = `
      UPDATE bills SET bill_number = ?, vendor_id = ?, item_id = ?, items_count = ?
      WHERE id = ?
    `;
    const values = [
      billData.bill_number,
      billData.vendor_id,
      billData.item_id,
      billData.items_count,
      billData.id,
    ];

    await pool.query(query, values);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function deleteBills(billId) {
  try {
    const query = `
      DELETE FROM bills WHERE id = ?
    `;

    await pool.query(query, [billId]);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Functions
async function getOpeningStocks(itemId) {
  const [rows] = await pool.query(
    `
      SELECT opening_stocks FROM stocks WHERE id = ?
    `,
    [itemId],
  );

  return rows[0].opening_stocks;
}

async function updateOpeningStocks(itemId, count) {
  await pool.query(
    `
      UPDATE stocks SET opening_stocks = ? WHERE id = ?
    `,
    [count, itemId],
  );
}

async function getStocksOnHand(itemId) {
  const [rows] = await pool.query(
    `
      SELECT stocks_on_hand FROM stocks WHERE id = ?
    `,
    [itemId],
  );

  return rows[0].stocks_on_hand;
}

async function updateStocksOnHand(itemId, count) {
  await pool.query(
    `
      UPDATE stocks SET stocks_on_hand = ? WHERE id = ?
    `,
    [count, itemId],
  );
}
