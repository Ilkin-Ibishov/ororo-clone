import { motion } from "framer-motion";
import './MobileStyles.css'


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

interface MenuItem {
  text: string;
}

export const MenuItem: React.FC<MenuItem> = ({text}) => {
  const style = { border: `2px solid ${colors[3]}` };
  return (
    <div className="mobile-li">
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center">
      <div className="icon-placeholder" style={style} />
      <div className=" text-xl text-white text-nowrap">{text}</div>
    </motion.li>
    </div>
  );
};
