"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
