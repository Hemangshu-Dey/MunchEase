import { Product } from "../models/product.model.js";
import { response } from "../utils/response.util.js";

const getProducts = async (req, res) => {
  const desc = req.query.desc === "true";
  const limit = 6;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const sortOrder = desc ? -1 : 1;
    const products = await Product.find()
      .sort({ price: sortOrder })
      .limit(limit)
      .skip(offset);

    return response(res, 200, "Products fetched successfully", products, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

const getProductsByName = async (req, res) => {
  const name = req.query.name || "";
  const limit = 6;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    })
      .limit(limit)
      .skip(offset);
    return response(res, 200, "Products fetched successfully", products, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

const getProductsByCategory = async (req, res) => {
  const categoryName = req.query.categoryName || "";
  const desc = req.query.desc === "true";
  const limit = 6;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const sortOrder = desc ? -1 : 1;
    const products = await Product.find({ category: categoryName })
      .sort({ price: sortOrder })
      .limit(limit)
      .skip(offset);

    return response(res, 200, "Products fetched successfully", products, "");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error", null, error);
  }
};

export { getProducts, getProductsByName, getProductsByCategory };
