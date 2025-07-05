"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { InputContextProvider } from "@/contexts/InputContext";

export default function QuestionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InputContextProvider>
      <div>
        <Breadcrumb />
        {children}
      </div>
    </InputContextProvider>
  );
}
