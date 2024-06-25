"use client";

import { Inter } from "next/font/google";
import NavOverlay from "@/component/navOverlay";
import { useEffect, useState } from "react";
import { DetailPostContext, OurPostContext } from "../public/itemContext";
import axios from "axios";

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

  const [detailPost, setDetailPost] = useState({});
  const value2 = {
    detailPost: detailPost,
    setDetailPost: setDetailPost,
  };

  function getInitValue() {
    axios
      .get(`http://localhost:3000/post/id${window.location.search}`)
      .then((response) => {
        if (response.data != null) {
          setDetailPost(response.data);
        }
      });
  }

  useEffect(() => {
    console.log(ourPostState);
    getInitValue()
  }, [ourPostState]);

  return (
    <body className={`${inter.className} justify-between`}>
      <OurPostContext.Provider value={value}>
        <DetailPostContext.Provider value={value2}>
          <NavOverlay>{children}</NavOverlay>
        </DetailPostContext.Provider>
      </OurPostContext.Provider>
    </body>
  );
}
