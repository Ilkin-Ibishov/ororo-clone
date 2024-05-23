import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

interface FilterList {
  selectedContent: string;
  setSelectedSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectedSortBy: string;
  orderOptions: { value: string; text: string }[];
}

export const FilterList: React.FC<FilterList> = ({
  orderOptions,
  setSelectedSortBy,
  selectedSortBy
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav ref={containerRef} initial={false} animate={isOpen ? "open" : "closed"} className="h-10">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2E353D] cursor-pointer text-center flex flex-row justify-between px-3 items-center text-white h-10 w-40 text-nowrap"
      >
        <span onClick={() => setIsOpen(!isOpen)} >
          {orderOptions?.find((option) => option.value === selectedSortBy)?.text ?? orderOptions[0].text}
        </span>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55, color: "white" }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" style={{ fill: "white" }} />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="relative top-2 z-40 w-40 rounded-md bg-white"
      >
        {orderOptions.map((item) => (
          <motion.li
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            key={item.value}
            variants={itemVariants}
            onClick={() => {setSelectedSortBy(item.value), setIsOpen(false)}}
            className="bg-white text-black py-1 text-left pl-4 hover:bg-[#2196f3] hover:pl-6 hover:text-white cursor-pointer"
          >
            {item.text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};
