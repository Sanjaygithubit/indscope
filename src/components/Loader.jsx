import { motion } from "framer-motion";

function Loader({ text = "Loading..." }) {
  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />

      {/* Text */}
      <p className="mt-4 text-gray-500 text-sm">
        {text}
      </p>
    </div>
  );
}

export default Loader;
