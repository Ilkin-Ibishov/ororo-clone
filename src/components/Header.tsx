import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeaderButton from './HeaderButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const languages = [
  { fullLanguageText: "English", shortLanguageText: "En" },
  { fullLanguageText: "Italian", shortLanguageText: "It" },
  { fullLanguageText: "Spanish", shortLanguageText: "Es" },
  { fullLanguageText: "Polish", shortLanguageText: "Pl" },
  { fullLanguageText: "Portuguese", shortLanguageText: "Pt" },
  { fullLanguageText: "Turkish", shortLanguageText: "Tr" },
];
interface Header {
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}
export const Header: React.FC<Header> = ({ setselectedContent}) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0].shortLanguageText);
  const [islanguageBarVisible, setLanguageBarVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false)
  const navButtonCss = "bg-[#3d4753] text-white"
  const currentContentType = localStorage.getItem('selectedContent') as string

  return (
    <>
      <div className='flex z-50 sticky top-0 flex-row items-center justify-between px-20 bg-[#2E353D] h-[3.75rem] min-w-[50rem] w-full  text-color-css-header'>
        <div className='flex flex-row'>
          <Link to={'/'} onClick={() => {setselectedContent('tv'); localStorage.setItem('selectedContent', 'tv')}}><img className='w-28 pr-4 py-2' src="https://ororo.tv/assets/logo-7357121603f7afa41b456a871fdbff02dafe08b8cefff7a7e7cb320a57080bdc.svg" alt="" /></Link>
          <Link to={'/tv'} onClick={() => {setselectedContent('tv'); localStorage.setItem('selectedContent', 'tv')}} className={`text-base p-3 ${currentContentType === 'tv' && navButtonCss} hover:text-white cursor-pointer text-nowrap`}>TV Shows</Link>
          <Link to={'/movie'} onClick={() =>{setselectedContent('movie'); localStorage.setItem('selectedContent', 'movie')}} className={`text-base p-3 ${currentContentType === 'movie' && navButtonCss} hover:text-white cursor-pointer text-nowrap`}>Movies</Link>
        </div>
        <div className='flex justify-between items-center gap-5'>
          <div hidden={!islanguageBarVisible} onBlur={() =>{setLanguageBarVisible(false); localStorage.setItem('selectedContent', 'movie')}} className='absolute top-[3.75rem]'>
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
          <SearchBar setInputFocused={setInputFocused} isInputFocused={isInputFocused} />
        </div>
      </div>
    </>
  );
};
