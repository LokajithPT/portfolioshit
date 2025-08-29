import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function someshit() {
  const [playVideo, setPlayVideo] = useState(false);
  const [showElements, setShowElements] = useState(true);

  const glitchVariants = {
    hidden: { opacity: 0, y: 100, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    glitchOut: {
      opacity: 0,
      x: [0, -10, 10, -20, 20, 0],
      filter: "contrast(200%) hue-rotate(90deg)",
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const handleClick = () => {
    setShowElements(false);
    setTimeout(() => {
      setPlayVideo(true);
    }, 2000); // wait for glitch before video
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Elements / Widgets */}
      <AnimatePresence>
        {showElements && (
          <motion.div
            initial="visible"
            exit="glitchOut"
            variants={glitchVariants}
            className="flex flex-col items-center justify-center h-full text-white space-y-6"
          >
            <motion.h1 className="text-5xl font-bold">Loki's World</motion.h1>
            <motion.p className="text-xl text-gray-300">
              Programmer • Hacker • Builder
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={handleClick}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white rounded-2xl shadow-lg"
            >
              Very Cool Button
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video */}
      {playVideo && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src="/video.mp4"
          autoPlay
          loop
          muted={false}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}

