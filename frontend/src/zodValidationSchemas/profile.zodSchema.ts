import { z } from "zod";

export const addressSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  addressLineOne: z.string({
    required_error: "First address line is required",
  }),
  addressLineTwo: z.string().optional(),
  city: z.string({
    required_error: "City is required",
  }),
  state: z.string({
    required_error: "State is required",
  }),
  zip: z.number({
    required_error: "Zip code is required",
  }),
});
