import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body
          className={`font-poppins`}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#063c28",
                color: "#fff",
              },
              duration: 3000
            }} />

        </body>
      </html>
    </>
  )
}
