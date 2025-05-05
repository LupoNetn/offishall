import Script from 'next/script';
import "./globals.css";
import { Toaster } from 'sonner';
import Navbar from "../components/Navbar";
import CartContextProvider from "../context/CartContext";
import Footer from "../components/Footer";

export const metadata = {
  title: "Offishall Stores",
  description: "Shop from us - Offishall Stores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          src="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          strategy="afterInteractive"
        />
      </head>
      <CartContextProvider>
        <body className="bg-gray-950">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster theme="dark" position="top-right" />
        </body>
      </CartContextProvider>
    </html>
  );
}
