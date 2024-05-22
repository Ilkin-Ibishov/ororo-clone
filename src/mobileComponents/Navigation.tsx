import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import './MobileStyles.css'


const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <motion.ul className="mobile-ul" variants={variants}>
    <MenuItem text={'Login'} />
    <MenuItem text={'Sign up'} />  
    <MenuItem text={'Language'} />  
  </motion.ul>
);


