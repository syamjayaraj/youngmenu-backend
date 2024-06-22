import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IIStore extends Document {
  name: string;
  addres: string;
  owner: ObjectId;
  manager: ObjectId;
}

const storeSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model<IIStore>("Store", storeSchema);
export default Store;
