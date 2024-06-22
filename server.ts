import express from "express";
import mongoose, { Error } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import formidableMiddleware from "express-formidable";
import dotenv from "dotenv";

import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import storeRouter from "./routes/stores";
import orderRouter from "./routes/orders";

const app = express();
dotenv.config();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(formidableMiddleware());

const PORT = process.env.PORT || 3010;

// MongoDB connection
let options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGO_URI as string, options)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.log(err));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/stores", storeRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
