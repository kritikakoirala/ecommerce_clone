import Stripe from "stripe"


if (!process?.env?.STRIPE_SECRET_KEY) {
  throw new Error("Stripe Secret key is not defined")
}

export const stripe = new Stripe(process?.env?.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil"

})
