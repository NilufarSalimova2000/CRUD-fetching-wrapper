"use client";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

export const Modal = ({ children, isOpen, close }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="bg-[#00000070] fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-[450px] p-[20px]">
        <button onClick={close}>X</button>
        {children}
      </div>
    </div>
  );
};
