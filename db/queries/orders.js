import db from "#db/client";

export async function createOrder(date, notes, userId) {
    const sql = `
    INSERT INTO orders (date, notes, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
    const {
        rows: [order],
    } = await db.query(sql, [date, notes, userId]);
    return order;
}

export async function getOrdersByUserId(id) {
    const sql = `
    SELECT * 
    FROM orders
    WHERE user_id = $1;
    `;
    const { rows: orders } = await db.query(sql, [id]);
    return orders;
}

export async function getOrderById(id) {
    const sql = `
    SELECT * 
    FROM orders
    WHERE id = $1;
    `;
    const {
        rows: [order],
    } = await db.query(sql, [id]);
    return order;
}

export async function getOrdersByProductId(id) {
    const sql = `
    SELECT orders.*
    FROM orders
    JOIN order_products ON orders.id = order_products.order_id
    WHERE order_products.product_id = $1;
    `;
    const { rows: orders } = await db.query(sql, [id]);
    return orders;
}