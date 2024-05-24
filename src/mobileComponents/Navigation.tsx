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
  isOpen: boolean;
  toggleOpen: () => void;
}
export const Navigation: React.FC<Navigation> = ({isOpen, toggleOpen}) => (
  <motion.ul className={isOpen? "mobile-ul": 'no-style'} variants={variants}>
    <MenuItem text={'TV Shows'} id={'tv'} toggleOpen={toggleOpen} />
    <MenuItem text={'Movies'} id={'movie'} toggleOpen={()=>toggleOpen()}  />
    <MenuItem text={'Login'} id={'login'} toggleOpen={toggleOpen} />
    <MenuItem text={'Sign up'} id={'sign-up'} toggleOpen={toggleOpen} />
    <MenuItem text={'Language'} id={'*'} toggleOpen={toggleOpen} />
  </motion.ul>
);


