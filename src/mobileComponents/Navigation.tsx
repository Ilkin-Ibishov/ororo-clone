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

interface Navigation {
  isOpen: boolean
}
export const Navigation: React.FC<Navigation> = ({isOpen}) => (
  <motion.ul className={isOpen? "mobile-ul": 'no-style'} variants={variants}>
    <MenuItem text={'Login'} />
    <MenuItem text={'Sign up'} />  
    <MenuItem text={'Language'} />  
  </motion.ul>
);


