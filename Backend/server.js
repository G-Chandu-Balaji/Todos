import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./Routes/todo.route.js";
import cors from "cors";

dotenv.config();

const app = new express();
let port = process.env.PORT || 5100;

//Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log("Database connection  failed", err.message);
    process.exit(1);
  });

//Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/todos", todoRoutes);

//start server
app.listen(port, () => {
  console.log(`Server is runnning on ${port}...`);
});
