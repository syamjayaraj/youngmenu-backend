import { Request, Response } from "express";
import Order from "../models/Order";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate("restaurant");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  const { tableNumber, items, restaurant } = req.body;

  try {
    const order = new Order({
      tableNumber,
      items,
      restaurant,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getOrders, createOrder, updateOrderStatus };
