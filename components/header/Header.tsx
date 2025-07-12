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

export default async function Header() {
  const user = await currentUser()
  return (
    <header className="bg-white py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="flex px-6 items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <Favorite />

          <ClerkLoaded>
            <SignedIn>
              <UserButton />
              {/*<div>You are signed in</div>*/}
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
