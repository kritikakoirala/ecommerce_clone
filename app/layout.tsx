export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body
          className={`font-poppins`}
        >
          {children}
        </body>
      </html>
    </>
  )
}
