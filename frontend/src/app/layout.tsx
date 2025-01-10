import type { Metadata } from "next";
import { Inter, Sigmar_One, Albert_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const albert_Sans = Albert_Sans({ subsets: ["latin"] });
const sigmar_One = Sigmar_One({subsets: ["latin"],display : "swap",weight: "400"});

export const metadata: Metadata = {
  title: "Inventory App",
  description: "A x product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
