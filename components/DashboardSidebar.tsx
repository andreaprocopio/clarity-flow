"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import { IconListDetails, IconChartDots2 } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DashboardSidebar() {
  const pathname = usePathname();
  const iconClasses = "h-5 w-5 shrink-0";

  const links = [
    {
      label: "Tasks",
      href: "/tasks",
      icon: (
        <IconListDetails
          className={cn(
            iconClasses,
            pathname === "/tasks"
              ? "text-[#00CDEC]"
              : "text-gray-900 dark:text-[#253D4D]"
          )}
        />
      ),
    },
    {
      label: "Statistics",
      href: "/statistics",
      icon: (
        <IconChartDots2
          className={cn(
            iconClasses,
            pathname === "/statistics"
              ? "text-[#00CDEC]"
              : "text-gray-900 dark:text-[#253D4D]"
          )}
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col md:sticky md:top-0 overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200 md:flex-row dark:border-neutral-700 py-3 md:py-20 md:pt-12 md:max-h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-14 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/?noRedirect=true"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black cursor-pointer"
    >
      <Image
        src="/clarityflow.png"
        width={20}
        height={20}
        alt="clarity flow logo"
        quality={100}
        className="h-5 w-5 shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        ClarityFlow
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <Image
        src="/clarityflow.png"
        width={20}
        height={20}
        alt="clarity flow logo"
        className="h-5 w-5 shrink-0"
      />
    </div>
  );
};
