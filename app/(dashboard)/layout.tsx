import React, { ReactNode } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar />
      <div className="p-6 md:p-14 grow flex">{children}</div>
    </div>
  );
};

export default DashboardLayout;
