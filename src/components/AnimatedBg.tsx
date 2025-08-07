"use client";

import { motion } from "framer-motion";

export default function AnimatedBg() {
    return (
        <motion.div
            className="fixed -z-10 top-0 w-full h-full pointer-events-none"
            style={{
                backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
          radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
        `,
                backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
            }}
            animate={{
                backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
            }}
        />
    );
}
