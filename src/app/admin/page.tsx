"use client";
import React, { useState } from "react";
import AdminComponent from "@/components/AdminComponent";
import { LoginForm } from "@/components/LoginForm";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (password: string) => {
    if (password === "Brave222#") {
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      {!isAuthenticated ? <LoginForm onPasswordChange={handleSubmit} /> : <AdminComponent />}
    </>
  );
}
