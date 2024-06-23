import { Inter } from "next/font/google";
import NavOverlay from "@/component/navOverlay";

const inter = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${inter.className} justify-between`}>
      <NavOverlay>{children}</NavOverlay>
    </body>
  );
}
