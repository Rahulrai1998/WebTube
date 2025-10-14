import React, { createContext, type ReactNode } from "react";

export const SidebarContext = createContext(null);
const SidebarProvider = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default SidebarProvider;
