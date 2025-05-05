import { Geist, Geist_Mono } from "next/font/google";
import AdminSidebar from "../../components/AdminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col sm:flex-row min-h-screen bg-gray-950">
          {/* Sidebar */}
          <aside className="w-full sm:w-64 lg:w-72 shrink-0 border-b sm:border-b-0 sm:border-r border-gray-800">
            <AdminSidebar />
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
