import { ThemeProvider } from "next-themes";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import MainNavigation from "../Navigation/MainNavigation";
import { Toaster } from "../ui/sonner";

const CoreLayout = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`relative min-h-[100dvh]`}>
        <div className="fixed bottom-5 right-5 z-[100] max-md:bottom-14">
          <ThemeToggle />
        </div>
        <MainNavigation />
        <div className="w-full">{children}</div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default CoreLayout;
