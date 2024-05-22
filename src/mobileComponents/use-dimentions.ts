import { useEffect, useRef } from "react";
import './MobileStyles.css'


export const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
