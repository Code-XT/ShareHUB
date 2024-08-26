"use client";
import { Home, LucideShare, LucideShrink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RedirectBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.div
      className="flex space-x-8 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {pathname !== "/" && (
        <motion.button
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-xl"
          whileHover={{
            scale: 1.2,
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/")}
        >
          <Home className="w-7 h-7 text-white" />
        </motion.button>
      )}
      <motion.button
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl"
        whileHover={{
          scale: 1.2,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/share")}
      >
        <LucideShare className="w-7 h-7 text-white" />
      </motion.button>
      <motion.button
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-xl"
        whileHover={{
          scale: 1.2,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          router.push("/shrink");
          router.refresh();
        }}
      >
        <LucideShrink className="w-7 h-7 text-white" />
      </motion.button>
    </motion.div>
  );
}
