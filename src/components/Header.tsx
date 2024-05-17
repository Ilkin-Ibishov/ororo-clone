import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import HeaderButton from './HeaderButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const languages = [
  { fullLanguageText: "English", shortLanguageText: "En" },
  { fullLanguageText: "Italian", shortLanguageText: "It" },
  { fullLanguageText: "Spanish", shortLanguageText: "Es" },
  { fullLanguageText: "Polish", shortLanguageText: "Pl" },
  { fullLanguageText: "Portuguese", shortLanguageText: "Pt" },
  { fullLanguageText: "Turkish", shortLanguageText: "Tr" },
];
interface Header {
  selectedContent: string;
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}
export const Header: React.FC<Header> = ({selectedContent, setselectedContent}) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0].shortLanguageText);
  const [islanguageBarVisible, setLanguageBarVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false)
  const navButtonCss = "bg-[#3d4753] text-white"

  return (
    <>
      <div className='flex z-50 sticky top-0 flex-row items-center justify-between px-14 bg-[#2E353D] h-[3.75rem] min-w-[50rem] w-screen -mx-5 text-color-css-header'>
        <div className='flex flex-row'>
          <Link to={'/'}><img className='w-28 pr-4' src="https://ororo.tv/assets/logo-7357121603f7afa41b456a871fdbff02dafe08b8cefff7a7e7cb320a57080bdc.svg" alt="" /></Link>
          <Link to={'/shows'} onClick={() => setselectedContent('tv')} className={`text-base p-3 ${selectedContent === 'tv' && navButtonCss} hover:text-white cursor-pointer`}>TV Shows</Link>
          <Link to={'/movies'} onClick={() => setselectedContent('movie')} className={`text-base p-3 ${selectedContent === 'movie' && navButtonCss} hover:text-white cursor-pointer`}>Movies</Link>
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
