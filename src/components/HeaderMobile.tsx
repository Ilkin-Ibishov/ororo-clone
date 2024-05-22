import { Search } from '@mui/icons-material';
import { MobileNav } from '../mobileComponents/MobileNav';
import { Link } from 'react-router-dom';

interface HeaderMobile {
    setselectedContent: React.Dispatch<React.SetStateAction<string>>
  }
const HeaderMobile: React.FC<HeaderMobile> = ({setselectedContent}) => {
  return (<>
    <div className='z-30 absolute w-10 h-20 '><MobileNav /></div>
    <div className='flex z-20 sticky top-0 px-5 flex-row justify-between items-center bg-[#2E353D] h-[3.75rem] w-full '>
        <div className='z-10 w-10 h-10'></div>
        <Link to={'/'} className='z-50' onClick={() => {setselectedContent('tv'); localStorage.setItem('selectedContent', 'tv')}}><img className='min-w-28' src="https://ororo.tv/assets/logo-7357121603f7afa41b456a871fdbff02dafe08b8cefff7a7e7cb320a57080bdc.svg" alt="" /></Link>
        <Search className='text-white scale-150' />
    </div>
  </>
    
  )
}

export default HeaderMobile