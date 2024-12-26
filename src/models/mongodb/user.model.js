import { Schema, model } from "mongoose";
import { createHash } from "../../utils.js";

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  //   cart: { type: Schema.Types.ObjectId, ref: 'cart', required: true },
  role: { type: String, default: "user" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = createHash(this.password);
  next();
});

export const userModel = model("User", UserSchema);
