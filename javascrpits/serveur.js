import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: cart.map(item => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    })),
    success_url: "https://tonsite.com/success.html",
    cancel_url: "https://tonsite.com/cancel.html"
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("🚀 Serveur Stripe lancé"));
