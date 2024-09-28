import { Product } from "../models/product.model.js";
import { response } from "../utils/response.util.js";
import mongoose from "mongoose";

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

const checkProductStock = async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return response(
      res,
      400,
      "Invalid products array",
      null,
      "Products array is required and must not be empty"
    );
  }

  try {
    const productIds = products.map((product) => {
      try {
        return new mongoose.Types.ObjectId(product.productId);
      } catch (error) {
        throw new Error(`Invalid productId: ${product.productId}`);
      }
    });

    const dbProducts = await Product.find({ _id: { $in: productIds } });

    const productsMap = new Map(
      dbProducts.map((product) => [product._id.toString(), product])
    );

    const insufficientStockProducts = [];

    for (const requestedProduct of products) {
      const productObjectId = new mongoose.Types.ObjectId(
        requestedProduct.productId
      );
      const dbProduct = productsMap.get(productObjectId.toString());

      if (!dbProduct) {
        insufficientStockProducts.push({
          productId: requestedProduct.productId,
          name: "Product not found",
          requestedQuantity: requestedProduct.quantity,
          availableStock: 0,
        });
      } else if (dbProduct.stock < requestedProduct.quantity) {
        insufficientStockProducts.push({
          productId: requestedProduct.productId,
          name: dbProduct.name,
          requestedQuantity: requestedProduct.quantity,
          availableStock: dbProduct.stock,
        });
      }
    }

    if (insufficientStockProducts.length > 0) {
      return response(
        res,
        400,
        "Insufficient stock for some products",
        insufficientStockProducts,
        ""
      );
    }

    return response(res, 200, "All products have sufficient stock", null, "");
  } catch (error) {
    console.error("Error checking product stock:", error);
    return response(res, 500, "Internal Server Error", null, error.message);
  }
};

export {
  getProducts,
  getProductsByName,
  getProductsByCategory,
  checkProductStock,
};
