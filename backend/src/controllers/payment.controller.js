import { response } from "../utils/response.util.js";

const makePayment = async (req, res) => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  const transactionId = `TNX-${timestamp}-${randomNum}`;
  return response(res, 200, "Payment Successful", { transactionId }, "");
};

export { makePayment };
