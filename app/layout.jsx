import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartContextProvider from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Offishall Stores",
  description: "Shop from us - Offishall Stores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartContextProvider>
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster theme="dark" position="top-right" />
        </body>
      </CartContextProvider>
    </html>
  );
}
