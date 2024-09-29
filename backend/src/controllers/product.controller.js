import { Product } from "../models/product.model.js";
import { response } from "../utils/response.util.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
  const { desc = "false", page = 1, categories = "", name = "" } = req.query;
  const limit = 6;
  const offset = (parseInt(page) - 1) * limit;
  const sortOrder = desc === "true" ? -1 : 1;

  const categoryArray = categories ? categories.split(",") : [];

  const filter = {};

  if (categoryArray.length > 0) {
    filter.category = { $in: categoryArray };
  }

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  try {
    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ price: sortOrder })
      .limit(limit)
      .skip(offset);

    return response(
      res,
      200,
      "Products fetched successfully",
      { products, totalProducts },
      ""
    );
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

const getProductById = async (req, res) => {
  const productId = new mongoose.Types.ObjectId(req.query.productId);

  try {
    const product = await Product.findOne({ _id: productId }).select([
      "-__v",
      "-createdAt",
      "-updatedAt",
    ]);

    return response(res, 200, "Product fetched successfully", product, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

export { getProducts, getProductById };
