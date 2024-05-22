import { motion } from "framer-motion";
import './MobileStyles.css'
import { Link } from "react-router-dom";
import { useSelectedContent } from '../SelectedContentContext';
import { SelectedContentProvider } from '../SelectedContentContext';


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

interface MenuItem {
  text: string;
  id: string;
  toggleOpen: (x:number)=> void;
}

export const MenuItem: React.FC<MenuItem> = ({text, id, toggleOpen}) => {
  const style = { border: `2px solid #2196f3` };
  const bgColorCondition = localStorage.getItem('selectedContent') === id && 'bg-white'
  const { setSelectedContent } = useSelectedContent();
  return (
    <SelectedContentProvider>
      <div className="mobile-li">
        <motion.li
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center">
          <div className={`icon-placeholder ${bgColorCondition}`} style={style} />
          {id === 'none'
            ? <div className=" text-xl text-white text-nowrap">{text}</div>
            : <Link to={`/${id}`} onClick={() =>{setSelectedContent(id); localStorage.setItem('selectedContent', id); toggleOpen(1) }}><div className=" text-xl text-white text-nowrap">{text}</div></Link> }
        </motion.li>
      </div>
    </SelectedContentProvider>
  );
};
