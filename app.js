import express from "express";
const app = express();
export default app;

import morgan from "morgan";
import getUserfromToken from "#middleware/getUserFromToken";
import orderRouter from "#api/orders";
import productRouter from "#api/products";
import userRouter from "#api/users";

app.use(express.json());
app.use(getUserfromToken);
app.use(express.urlencoded({ extended: true }));
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use(morgan("dev"));

app.use((err, req, res, next) => {
    switch (err.code) {
        case "22P02":
            return res.status(400).send(err.message);
        case "23505":
            return res.status(400).send(err.message);
        case "23503":
            return res.status(400).send(err.detail);
            default:
                next(err);
    }
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
})