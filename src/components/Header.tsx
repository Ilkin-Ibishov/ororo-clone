import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HeaderButton from './HeaderButton';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const languages = [
  { fullLanguageText: "English", shortLanguageText: "En" },
  { fullLanguageText: "Italian", shortLanguageText: "It" },
  { fullLanguageText: "Spanish", shortLanguageText: "Es" },
  { fullLanguageText: "Polish", shortLanguageText: "Pl" },
  { fullLanguageText: "Portuguese", shortLanguageText: "Pt" },
  { fullLanguageText: "Turkish", shortLanguageText: "Tr" },
];

export const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0].shortLanguageText);
  const [islanguageBarVisible, setLanguageBarVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [selectedPage, setselectedPage] = useState("tv-shows");
  const navButtonCss = "bg-[#3d4753] text-white";

  return (
    <>
      <div className='flex flex-row items-center justify-between px-14 bg-[#2E353D] h-[3.75rem] min-w-[50rem] w-full text-color-css-header'>
        <div className='flex flex-row'>
          <Link to={'/'}><img className='w-28 pr-4' src="https://ororo.tv/assets/logo-7357121603f7afa41b456a871fdbff02dafe08b8cefff7a7e7cb320a57080bdc.svg" alt="" /></Link>
          <a onClick={() => setselectedPage('tv-shows')} className={`text-base p-3 ${selectedPage === 'tv-shows' && navButtonCss} hover:text-white cursor-pointer`}>TV Shows</a>
          <a onClick={() => setselectedPage('videos')} className={`text-base p-3 ${selectedPage === 'videos' && navButtonCss} hover:text-white cursor-pointer`}>Videos</a>
        </div>
        <div className='flex justify-between items-center gap-5'>
          <div hidden={!islanguageBarVisible} onBlur={() => setLanguageBarVisible(false)} className='absolute top-[3.75rem]'>
              <div className="triangle-up -top-4 right-0 absolute z-10"></div>
              <div className='bg-[#444b54]'>
                <div className='w-[236px] min-w-[236px] h-full grid grid-cols-2'>
                  {languages.map((item) => (
                    <div key={item.shortLanguageText} onClick={() => { setCurrentLanguage(item.shortLanguageText); setLanguageBarVisible(false) }} className='py-4 hover:bg-[#212429] text-center px-5 text-white'>{item.fullLanguageText}</div>
                  ))}
                </div>
              </div>
          </div>
          <HeaderButton bgColor={"bg-[#f25423]"} text={"Log in"} isLogin={true} isInputFocused={isInputFocused} />
          <HeaderButton bgColor={"bg-[#0066E0]"} text={"Sign up"} isLogin={false} isInputFocused={isInputFocused} />
          <div hidden={isInputFocused}>
            <div onClick={()=>setLanguageBarVisible(!islanguageBarVisible)} className='flex flex-row'>
              <div className='min-w-5'>
                {currentLanguage}
              </div>
              {islanguageBarVisible?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon />}
            </div>
          </div>
          <div className='flex flex-col'>
            <SearchIcon className='absolute top-5 ml-3' />
            <input width="18.75rem" placeholder={"Search..."} onBlur={() => setInputFocused(false)} onFocus={() => setInputFocused(true)} className='bg-[#444b54] focus:w-96 w-32 border-r-8 py-3 pr-3 pl-10 border-transparent focus:border-transparent h-10' type="text" />
          </div>
        </div>
      </div>
    </>
  );
};
