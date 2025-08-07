'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a brief welcome
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBFAFA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#262626] mb-4">
          Welcome to Kudwa
        </h1>
        <p className="text-lg text-[#6B7280] mb-8">
          Finance Dashboard Challenge
        </p>
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-[#B09280] border-t-transparent rounded-full"
          />
        </div>
        <p className="text-sm text-[#6B7280] mt-4">
          Redirecting to dashboard...
        </p>
      </motion.div>
    </div>
  );
}
