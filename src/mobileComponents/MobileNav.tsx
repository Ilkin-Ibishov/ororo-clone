import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimentions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import './MobileStyles.css'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 30px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  console.log(isOpen);
  
  return (
    <motion.nav
        onMouseLeave={() => toggleOpen(0)}
        id="motion-nav"
        className={`${!toggleOpen? 'w-[300px]' : 'w-20'}`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
    >
      <motion.div className={`background-mobile ${isOpen? 'w-[300px] h-screen' : 'w-10 h-10'}`} variants={sidebar} />
      {isOpen && <Navigation isOpen={isOpen} />}
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
