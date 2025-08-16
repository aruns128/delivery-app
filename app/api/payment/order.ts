import Razorpay from "razorpay";
import type { NextApiRequest, NextApiResponse } from "next";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount } = JSON.parse(req.body);

  const order = await razorpay.orders.create({
    amount: amount * 100, // in paise
    currency: "INR",
    payment_capture: true,
  });

  res.json(order);
}
