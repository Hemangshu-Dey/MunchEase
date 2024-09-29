import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  addressLineOne: z
    .string({
      required_error: "First address line is required",
    })
    .min(1, "First address line is required"),
  addressLineTwo: z.string().optional(),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, "City is required"),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(1, "State is required"),
  zip: z
    .string({
      required_error: "Zip code is required",
    })
    .min(1, "Zip is required"),
});
