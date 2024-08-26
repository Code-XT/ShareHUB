"use client";
import { LucideShare, LucideShrink } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomeNavigation() {
  const router = useRouter();

  // Animation configuration
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };

  return (
    <div className="flex space-x-12 mt-24">
      <motion.div
        className="flex flex-col items-center"
        animate={{
          y: ["0%", "-20%", "0%"], // Bounce up and down
        }}
        transition={bounceTransition}
        whileHover={{ scale: 1.2, rotate: 10 }} // Enlarge and tilt slightly on hover
        whileTap={{ scale: 0.9 }} // Slightly shrink when clicked
        onClick={() => router.push("/share")}
      >
        <div className="flex items-center justify-center w-40 h-40 bg-blue-500 rounded-full shadow-lg">
          <LucideShare className="text-white w-20 h-20" />
        </div>
        <span className="mt-4 text-xl text-blue-500">Share</span>
      </motion.div>

      <motion.div
        className="flex flex-col items-center"
        animate={{
          y: ["0%", "-20%", "0%"], // Bounce up and down
        }}
        transition={bounceTransition}
        whileHover={{ scale: 1.2, rotate: -10 }} // Enlarge and tilt slightly on hover
        whileTap={{ scale: 0.9 }} // Slightly shrink when clicked
        onClick={() => router.push("/shrink")}
      >
        <div className="flex items-center justify-center w-40 h-40 bg-red-500 rounded-full shadow-lg">
          <LucideShrink className="text-white w-20 h-20" />
        </div>
        <span className="mt-4 text-xl text-red-500">Shrink</span>
      </motion.div>
    </div>
  );
}
