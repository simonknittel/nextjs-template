"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(() =>
  import("react-hot-toast").then((mod) => mod.Toaster),
);

export const ToasterWrapper = () => {
  return <Toaster />;
};
