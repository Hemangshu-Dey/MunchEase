import { Schema, model } from "mongoose";

const addressSchema = Schema({
  name: {
    type: String,
    required: [true, "Name should be provided"],
  },
  addressLineOne: {
    type: String,
    required: true,
  },
  addressLineTwo: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      minLength: [3, "Username must be between 3 characters long"],
      maxLength: [15, "Username must be between 15 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
