import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";

const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  const { name, address, owner } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      address,
      owner,
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export { getRestaurants, createRestaurant };
