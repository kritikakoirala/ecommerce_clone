"use server"

import { stripe } from "@/lib/stripe"
import { Address, Product } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { CartItem } from "@/store"
import Stripe from "stripe"


export interface Metadata {
  orderNumber: string,
  customerName: string,
  customerEmail: string,
  clerkUserId: string | undefined,
  address?: Address | null
}

export interface GroupedItemsType {
  groupedItems: CartItem['product'],
  quantity?: number
}

export async function createCheckoutSession(items: GroupedItemsType[], metadata: Metadata) {


  try {

    // Retreieve existing customer or create a new one

    const customer = await stripe.customers.list({
      email: metadata?.customerEmail,
      limit: 1
    })

    const customerId = customer?.data?.length > 0 ? customer?.data[0]?.id : ''

    if (!metadata?.clerkUserId) {
      throw new Error("clerkUserId is required");
    }


    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata?.orderNumber,
        customerName: metadata?.customerName,
        customerEmail: metadata?.customerEmail,
        clerkUserId: metadata?.clerkUserId && metadata?.clerkUserId,
        address: JSON.stringify(metadata?.address)
      },

      mode: 'payment',
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      invoice_creation: {
        enabled: true
      },
      success_url: `${process?.env?.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata?.orderNumber}`,
      cancel_url: `${process?.env?.NEXT_PUBLIC_APP_URL}/cart`,
      line_items: items?.map((item: any) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(item?.product?.price! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,

      }))
    }

    if (customerId) {
      sessionPayload.customer = customerId
    } else {
      sessionPayload.customer_email = metadata?.customerEmail
    }

    const session = await stripe.checkout.sessions.create(sessionPayload)
    return session.url

  } catch (err) {
    console.log(err)
    throw err
  }
}
