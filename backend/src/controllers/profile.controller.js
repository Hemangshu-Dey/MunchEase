import { User } from "../models/user.model.js";
import { response } from "../utils/response.util.js";
import mongoose from "mongoose";
import { addressSchema } from "../zodValidationSchemas/profile.zodSchema.js";

const addAddresses = async (req, res) => {
  const { name, addressLineOne, addressLineTwo, city, state, zip } = req.body;
  const userid = req.user.id;

  const id = new mongoose.Types.ObjectId(userid);

  const result = addressSchema.safeParse({
    name,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zip,
  });

  if (!result.success) {
    return response(
      res,
      400,
      "Failed to add address",
      "",
      result.error.errors[0].message
    );
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) return response(res, 400, "User not found", null, "");

    const address = {
      name,
      addressLineOne,
      addressLineTwo: addressLineTwo || "",
      city,
      state,
      zip,
    };

    user.address = [...user.address, address];

    await user.save();

    return response(res, 200, "Address added successfully", null, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

const getAddresses = async (req, res) => {
  const userid = req.user.id;

  const id = new mongoose.Types.ObjectId(userid);

  try {
    const addresses = await User.findOne({ _id: id }).select([
      "-username",
      "-email",
      "-password",
      "-refreshToken",
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
    ]);

    if (!addresses) return response(res, 400, "User not found", null, "");

    return response(res, 200, "Address fetched successfully", addresses, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

export { addAddresses, getAddresses };
