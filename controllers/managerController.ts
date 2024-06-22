import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { IRegister } from "../types/Auth";

const listManagers = async (req: Request, res: Response) => {
  try {
    const managers = await User.find({
      role: "manager",
    });
    res.json(managers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getManagerDetails = async (req: Request, res: Response) => {
  try {
    const manager = await User.findOne({
      _id: req.params.id,
      role: "manager",
    });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createManager = async (req: Request, res: Response) => {
  const { name, email, password }: IRegister = req.fields as any;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: any = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "manager",
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

const updateManagerDetails = async (req: any, res: Response) => {
  try {
    const updateFields: { [key: string]: any } = {};

    if (req.fields.name) updateFields.name = req.fields.name;
    if (req.fields.email) updateFields.email = req.fields.email;
    if (req.fields.restaurant) updateFields.restaurant = req.fields.restaurant;

    const manager = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "manager",
      },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteManager = async (req: any, res: Response) => {
  try {
    const manager = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "manager",
      },
      {
        $set: {
          isListed: false,
        },
      },

      { new: true }
    );
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  listManagers,
  getManagerDetails,
  createManager,
  updateManagerDetails,
  deleteManager,
};
