"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Train, 
  Lightbulb, 
  FlaskConical, 
  AlertTriangle, 
  ClipboardList, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const NavItem = ({ icon, label, href, active }: NavItemProps) => (
  <Link 
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? "bg-blue-600/20 text-blue-500" 
        : "hover:bg-neutral-800 text-neutral-400 hover:text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard-main" },
    { icon: <LayoutDashboard size={20} />, label: "Overview", href: "/dashboard-overview" },
    { icon: <Train size={20} />, label: "Train Management", href: "/trains" },
    { icon: <Brain size={20} />, label: "Decision Support", href: "/decisions" },
    { icon: <AlertTriangle size={20} />, label: "Disruptions", href: "/disruptions" },
    { icon: <Zap size={20} />, label: "Simulator", href: "/simulator" },
    { icon: <BarChart3 size={20} />, label: "Audit Logs", href: "/audit" },
  ];

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-neutral-800">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600">
              <Train size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">RailOptima</h1>
              <p className="text-xs text-neutral-400">Decision Support System</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-800">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer mt-1">
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-800 bg-neutral-900">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-800"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 right-0"></div>
              <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
                SC
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Section Controller</p>
              <p className="text-xs text-neutral-400">Delhi Division</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}