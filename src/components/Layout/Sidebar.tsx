"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Report",
      href: "/report",
      icon: "📝",
    },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-64 bg-white border-r border-gray-200 p-6 ${className}`}
    >
      {/* Logo/Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-[#262626]">Kudwa</h1>
        <p className="text-sm text-[#6B7280]">Finance Dashboard</p>
      </motion.div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#B09280] text-white shadow-md"
                        : "text-[#262626] hover:bg-[#FBFAFA] hover:shadow-sm"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
