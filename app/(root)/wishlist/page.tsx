import NoAccess from "@/components/cart/NoAccess"
import WishlistProducts from "@/components/wishlist/WishlistProducts"
import { currentUser } from "@clerk/nextjs/server"

export default async function Wishlist() {


  const user = await currentUser()
  return (
    <>
      {
        user ? <WishlistProducts /> : <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />

      }
    </>
  )
}
