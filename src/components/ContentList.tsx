import { useState, useEffect } from 'react';
import { getContent, getGenres } from '../api/requests';
import { Shows, Show, GenresResponse, Movie } from '../types/types';
import { ContentListCard } from './ContentListCard';
import ascendingIcon from '../assets/ascending-sorting.png'
import descendingIcon from '../assets/descending-sorting.png'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { orderOptionsMovie } from '../api/requests';
import { orderOptionsShow } from '../api/requests';
import { FilterDropwDown } from './FilterDropDown';

interface ContentList {
  selectedContent: string
}

export const ContentList: React.FC<ContentList> = ({selectedContent}) => {
  const orderOptions = selectedContent === 'movie' ? orderOptionsMovie : orderOptionsShow
  const [orderType, setOrderType] = useState<string>('asc')
  const [selectedSortBy, setSelectedSortBy] = useState<string>(orderOptions[0].value)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [isFilterHidden, setFilterHidden] = useState<boolean>(true)
  const [data, setData] = useState<Shows[]>([])
  const [genresTypes, setGenresTypes] = useState<GenresResponse | null>(null);
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setData([])
    setPage(1)
  }, [selectedContent, selectedSortBy, orderType])
  
  useEffect(() => {
    if(selectedContent !== undefined){
      const sort_by = selectedSortBy + '.' + orderType
      getGenres(selectedContent as string).then((response: GenresResponse) => {
        setGenresTypes(response)
      })
      getContent(selectedContent as string, page as number, sort_by).then((response: Shows) => {
        setData(prevData => [...prevData, response])
        setTotalResults(response ? response?.total_results : 0)
      })
    }
  }, [selectedContent, page, selectedSortBy, orderType])

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight*0.8) {
      setPage(prevPage => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='md:px-8 lg:px-[5%] bg-[#ECEFF1]'>
      <div hidden={isFilterHidden} className=' relative min-h-60 bg-black mt-7 border-r-4 shadow-custom-content w-52 mx-auto'>
            <title>Choose TV show</title>
            <div></div>
        </div>
      <div className='flex flex-row pt-12 pb-10 mx-4 items-center justify-between gap-5 md:gap-10 max-w-[screen]'>
        <div className="flex flex-col min-w-[120px]">
          <span color="#8896a1">Total</span>
          <span className="text-xl font-normal text-nowrap">{totalResults} TV Shows</span>
        </div>
        <div onClick={()=>setFilterHidden(!isFilterHidden)} className="w-full md:w-1/3 h-10 border-r-4 min-w-[250px] bg-[#2196f3] flex justify-center items-center">
            <FilterAltIcon htmlColor='white' />
            <span className='text-white '>Choose TV show</span>
        </div>
        <div className='flex flex-row'>
          <div className='bg-[#2E353D] h-10 w-10 p-1 flex justify-center items-center border-r-4 cursor-pointer'>
            {orderType === 'asc'?<img onClick={()=>setOrderType('desc')} src={ascendingIcon} alt="" />: <img onClick={()=>setOrderType('asc')} src={descendingIcon} alt="" />}
          </div>
          <FilterDropwDown orderOptions={orderOptions} selectedSortBy={selectedSortBy} selectedContent={selectedContent} setSelectedSortBy={setSelectedSortBy} />
        </div>
      </div>
      <div className=' mx-10 md:mx-0'>
        <div className=' gap-x-60 gap-y-10 md:gap-6 grid grid-cols-3 md:grid-cols-5 cssClass-text w-full'>
            {data.map((items: Shows) => (
              items.results.filter((item)=>item.poster_path !== null && item?.original_language === 'en' && (selectedContent ==='tv'?item?.origin_country?.find((item)=>item ==="US"): true )).map((item: Show | Movie, index: number) => (
                <ContentListCard key={index} item={item} genresTypes={genresTypes} />
              ))
            ))}
        </div>
      </div>
    </div>
  );
};
