"use client";
import React from "react";
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <h1>{error.message} </h1>
    </div>
  );
};

export default Error;
