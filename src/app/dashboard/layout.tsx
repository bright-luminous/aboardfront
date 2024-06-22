import { Inter } from "next/font/google";
import Sidebar from "@/component/sideBar";

const inter = Inter({ subsets: ["latin"] });

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${inter.className} flex items-start justify-between`}>
      <Sidebar>{children}</Sidebar>
    </body>
  );
}
