"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleMobileMenu, setMobileMenuOpen } from "@/lib/slices/uiSlice";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main Layout Component
 *
 * Provides the overall application structure with responsive navigation.
 * Features:
 * - Responsive sidebar navigation (desktop)
 * - Mobile menu with hamburger button
 * - Smooth animations and transitions
 * - Proper accessibility with ARIA labels
 * - Mobile-optimized layout with proper spacing
 * - Professional Kudwa branding colors
 */

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { mobileMenuOpen } = useAppSelector((state) => state.ui);

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu());
  };

  const handleCloseMobileMenu = () => {
    dispatch(setMobileMenuOpen(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen bg-[#FBFAFA]"
    >
      {/* Mobile Menu Button - Moved to right side */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={handleToggleMobileMenu}
          className="p-2 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-[#262626] block transition-all duration-200"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-[#262626] block mt-1 transition-all duration-200"
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="w-5 h-0.5 bg-[#262626] block mt-1 transition-all duration-200"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu onClose={handleCloseMobileMenu} />}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:block" />

      {/* Main Content */}
      <main className="flex-1 w-full md:w-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-4 md:p-6 pt-16 md:pt-6"
        >
          {children}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Layout;
