import db from "#db/client";

export async function createProduct(title, price, description) {
    const sql = `
    INSERT INTO products (title, price, description)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
    const {
        rows: [product],
    } = await db.query(sql, [title, price, description]);
    return product;
}

export async function getProducts() {
    const sql = `
    SELECT * 
    FROM products;
    `;
    const { rows: products } = await db.query(sql);
    return products;
}

export async function getProductByOrderId(id) {
    const sql = `
    SELECT products.*
    FROM products
    JOIN order_products ON orders_products.product_id = products.id
    JOIN orders ON orders.id = order_products.order_id
    WHERE orders.id = $1;
    `;
    const { rows: products } = await db.query(sql, [id]);
    return products;
}

export async function getProductById(id) {
    const sql = `
    SELECT * 
    FROM products
    WHERE id = $1;
    `;
    const {
        rows: [product],
    } = await db.query(sql, [id]);
    return product;
}