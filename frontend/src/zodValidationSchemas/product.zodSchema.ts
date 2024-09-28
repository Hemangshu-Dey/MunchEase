import { z } from "zod";

const objectIdSchema = z
  .string()
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId format",
  });

export const productObjectSchema = z.object({
  productId: objectIdSchema,
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int()
    .positive({
      message: "Quantity must be a positive integer",
    }),
});
