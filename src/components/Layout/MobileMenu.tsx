"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
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
    <>
      {/* Backdrop - Changed to rgba with transparency */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 md:hidden"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      />

      {/* Menu Panel - Changed background to rgba with transparency */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-xl z-50 md:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-[#262626]">Kudwa</h1>
            <p className="text-sm text-[#6B7280]">Finance Dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-[#262626]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link href={item.href} onClick={onClose}>
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
      </motion.div>
    </>
  );
};

export default MobileMenu;
