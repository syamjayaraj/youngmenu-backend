import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
  name: string;
  description: string;
  price: number;
}

const itemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    variant: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model<IItem>("Item", itemSchema);
export default Item;
