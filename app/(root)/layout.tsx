import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";



export const metadata: Metadata = {
  title: {
    template: `%s | Shop Online to your heart's content`,
    default: "Ecommerce Shop Online"
  },
  description: "Ecommerce Application to shop to your heart's content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-6">
          {children}
        </main>


        <Footer />
      </div>

    </ClerkProvider>
  );
}
