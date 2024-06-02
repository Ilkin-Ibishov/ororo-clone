import { MobileNav } from '../mobileComponents/MobileNav';
import { Link } from 'react-router-dom';
import SearchBarMobile from './SearchBarMobile';

interface HeaderMobile {
    setselectedContent: React.Dispatch<React.SetStateAction<string>>
  }
const HeaderMobile: React.FC<HeaderMobile> = ({setselectedContent}) => {
  return (<div className=' z-50'>
    <div className=' z-50 absolute w-10 h-20 '><MobileNav /></div>
    <div className='flex z-20 sticky top-0 flex-row justify-between items-center bg-primary h-[3.75rem] w-full '>
        <div className='z-10 w-20 h-10'></div>
        <Link 
          to={'/tv'} 
          className='z-50' 
          onClick={() => {setselectedContent('tv'); localStorage.setItem('selectedContent', 'tv')}}>
            <img className='min-w-28' src="https://ororo.tv/assets/logo-7357121603f7afa41b456a871fdbff02dafe08b8cefff7a7e7cb320a57080bdc.svg" alt="" />
        </Link>
        <SearchBarMobile />
    </div>
  </div>
    
  )
}

export default HeaderMobile