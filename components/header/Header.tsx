import { auth, currentUser } from "@clerk/nextjs/server";
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { ClerkLoaded, SignedIn, SignOutButton, useClerk, UserButton } from "@clerk/nextjs";
import Container from "../Container";
import Logo from "../Logo";
import CartIcon from "./CartIcon";
import Favorite from "./Favorite";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

export default async function Header() {
  const user = await currentUser()
  const { userId } = await auth()
  let orders = null

  if (userId) {
    orders = await getMyOrders(userId)
  }

  return (
    <header className="bg-white py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="flex px-6 items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          {/*<SearchBar />*/}
          <CartIcon />
          <Favorite />

          {user && (
            <Link href={"/orders"} className="group relative hover:text-shop_light_green hoverEffect"
            >
              <Logs />
              <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          )}

          <ClerkLoaded>
            <SignedIn>

              <UserButton />
            </SignedIn>
            {
              !user && <SignIn />
            }



          </ClerkLoaded>
        </div>
      </Container>
    </header>
  )
}
