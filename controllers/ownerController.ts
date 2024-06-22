import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { IRegister } from "../types/Auth";

const listOwners = async (req: Request, res: Response) => {
  try {
    const owners = await User.find({
      role: "owner",
    });
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOwnerDetails = async (req: Request, res: Response) => {
  try {
    const owner = await User.findOne({
      _id: req.params.id,
      role: "owner",
    });
    res.json(owner);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createOwner = async (req: Request, res: Response) => {
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
    role: "owner",
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

const updateOwnerDetails = async (req: any, res: Response) => {
  try {
    const updateFields: { [key: string]: any } = {};

    if (req.fields.name) updateFields.name = req.fields.name;
    if (req.fields.email) updateFields.email = req.fields.email;
    if (req.fields.restaurant) updateFields.restaurant = req.fields.restaurant;

    const owner = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "owner",
      },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    res.json(owner);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteOwner = async (req: any, res: Response) => {
  try {
    const owner = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "owner",
      },
      {
        $set: {
          isListed: false,
        },
      },

      { new: true }
    );
    res.json(owner);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  listOwners,
  getOwnerDetails,
  createOwner,
  updateOwnerDetails,
  deleteOwner,
};
