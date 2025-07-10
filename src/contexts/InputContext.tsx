/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useState } from "react";

export interface InputContextProps {
  inputState: Record<string, any>;
  setInputState: (newState: Record<string, any>) => void;
}

export const InputContext = createContext<InputContextProps | null>(null);

export const InputContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputState, setInputState] = useState<Record<string, any>>({});

  return (
    <InputContext.Provider value={{ inputState, setInputState }}>
      {children}
    </InputContext.Provider>
  );
};
