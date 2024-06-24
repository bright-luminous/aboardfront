"use client";

import { Inter } from "next/font/google";
import NavOverlay from "@/component/navOverlay";
import { useEffect, useState } from "react";
import { OurPostContext } from "../public/itemContext";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ourPostState, setOurPostState] = useState(false);
  const value = {
    ourPostState: ourPostState,
    setOurPostState: setOurPostState,
  };

  useEffect(() => {
    console.log(ourPostState);
  }, [ourPostState]);

  return (
    <body className={`${inter.className} justify-between`}>
      <OurPostContext.Provider value={value}>
        <NavOverlay>{children}</NavOverlay>
      </OurPostContext.Provider>
    </body>
  );
}
