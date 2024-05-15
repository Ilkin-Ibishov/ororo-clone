import React from 'react';
import LoginIcon from '@mui/icons-material/Login';

interface HeaderButtonProps {
  bgColor: string;
  text: string;
  isLogin: boolean;
  isInputFocused: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ bgColor, text, isLogin, isInputFocused }) => {
  
  return (
    <button hidden={isInputFocused} className={`${bgColor} p-2 border-0 text-white rounded-[4px]`}>
      {isLogin && <LoginIcon className='mr-1' />}
      {text}
    </button>
  );
};


export default HeaderButton;
