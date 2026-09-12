import localFont from "next/font/local"
import "./globals.scss"

const kumbhSans = localFont({
  src: [
    { path: "./fonts/KumbhSans-Light.ttf", weight: "300" },
    { path: "./fonts/KumbhSans-Regular.ttf", weight: "400" },
    { path: "./fonts/KumbhSans-Bold.ttf", weight: "700" },
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>{children}</body>
    </html>
  )
}
