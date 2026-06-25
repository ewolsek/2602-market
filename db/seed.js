import db from "#db/client";
import { createProduct } from "#db/queries/products";
import { createUser } from "#db/queries/users";
import { createOrder } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    await createProduct("Product" + i, i * 10.00);
  }
  const user = await createUser("user", "password");
  const order = await createOrder("2001-01-01", user.id);
  for (let i=0; productId < 5; i++) {
    await createOrderProduct(order.id, productId); 
  }
}
