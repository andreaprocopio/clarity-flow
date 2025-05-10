"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ArrowUpToLine, Rocket, CircleHelp } from "lucide-react";

interface FloatingNavbarProps {
  isLoggedIn: boolean;
}

export function FloatingNavbar({ isLoggedIn }: FloatingNavbarProps) {
  const navItems = [
    {
      name: "Home",
      link: "#",
      icon: (
        <ArrowUpToLine className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Features",
      link: "#features",
      icon: <Rocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Tutorial",
      link: "#tutorial",
      icon: <CircleHelp className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} isLoggedIn={isLoggedIn} />
    </div>
  );
}
