import React from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button 
      variant="contained" 
      onClick={handleScrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        borderRadius: '50%',
        minWidth: '3rem',
        minHeight: '3rem',
        backgroundColor: '#2E353D'
      }}
    >
      <ArrowUpwardIcon />
    </Button>
  );
};

export default ScrollToTopButton;
