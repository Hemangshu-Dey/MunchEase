import { Product } from "../models/product.model.js";
import { response } from "../utils/response.util.js";
import mongoose from "mongoose";
import { productObjectSchema } from "../zodValidationSchemas/product.zodSchema.js";

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
    const product = await Product.findOne({ _id: productId });

    return response(res, 200, "Product fetched successfully", product, "");
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

  products.forEach((product) => {
    const result = productObjectSchema.safeParse({
      product,
    });

    if (!result.success) {
      return response(
        res,
        400,
        "Invalid product format received.",
        "",
        result.error.errors[0].message
      );
    }
  });

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

export { getProducts, getProductById, checkProductStock };
