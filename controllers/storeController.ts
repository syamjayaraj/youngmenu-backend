import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { IRegister } from "../types/Auth";
import Store from "../models/Store";

const listStores = async (req: Request, res: Response) => {
  try {
    const stores = await Store.find({
      role: "store",
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getStoreDetails = async (req: Request, res: Response) => {
  try {
    const store = await Store.findOne({
      _id: req.params.id,
      role: "store",
    });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createStore = async (req: Request, res: Response) => {
  const { name, email, password }: IRegister = req.fields as any;
  const userExists = await Store.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: any = await Store.create({
    name,
    email,
    password: hashedPassword,
    role: "store",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const updateStoreDetails = async (req: any, res: Response) => {
  try {
    const updateFields: { [key: string]: any } = {};

    if (req.fields.name) updateFields.name = req.fields.name;
    if (req.fields.email) updateFields.email = req.fields.email;
    if (req.fields.restaurant) updateFields.restaurant = req.fields.restaurant;

    const store = await Store.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "store",
      },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteStore = async (req: any, res: Response) => {
  try {
    const store = await Store.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "store",
      },
      {
        $set: {
          isListed: false,
        },
      },

      { new: true }
    );
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  listStores,
  getStoreDetails,
  createStore,
  updateStoreDetails,
  deleteStore,
};
