// useInputContext.ts
import { InputContext } from "@/contexts/InputContext";
import { useContext } from "react";

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputContextProvider");
  }
  return context;
};