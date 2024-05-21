import { useState, useEffect, useCallback } from 'react';
import { getContent, getGenres } from '../api/requests';
import { Contents, ShowPreview, GenresResponse, MoviePreview } from '../types/types';
import { ContentListCard } from './ContentListCard';
import ascendingIcon from '../assets/ascending-sorting.png';
import descendingIcon from '../assets/descending-sorting.png';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { orderOptionsMovie, orderOptionsShow } from '../api/requests';
import { FilterList } from './FilterList';
import { TVShow } from '../types/ShowTypes';
import FilterContents from './FilterContents';

interface ContentList {
  selectedContent: string;
}

export const ContentList: React.FC<ContentList> = ({ selectedContent }) => {
  const orderOptions = selectedContent === 'movie' ? orderOptionsMovie : orderOptionsShow;
  const [orderType, setOrderType] = useState<string>('desc');
  const [selectedSortBy, setSelectedSortBy] = useState<string>(orderOptions[0].value);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isFilterHidden, setFilterHidden] = useState<boolean>(true);
  const [data, setData] = useState<Contents[]>([]);
  const [genresTypes, setGenresTypes] = useState<GenresResponse | null>(null);
  const [page, setPage] = useState<number>(0);

  const filterUniquePages = (data: Contents[]) => {
    const uniquePages = new Set();
    return data.filter(item => {
      if (!uniquePages.has(item.page)) {
        uniquePages.add(item.page);
        return true;
      }
      return false;
    });
  };

  const handleGetContent = (isFirstPage: boolean) => {
    const requestedPage = isFirstPage ? 1 : page;
    const sort_by = selectedSortBy + '.' + orderType;
    const selectedGenres = JSON.parse(localStorage.getItem('selectedGenres') as string);
    const selectedGenreIds = genresTypes?.genres.filter(genre => selectedGenres?.includes(genre.name)).map(genre => genre.id).join(',');

    getContent(selectedContent as string, requestedPage as number, sort_by, selectedGenreIds as string).then((response: Contents) => {
      const newData = isFirstPage ? [response] : [...data, response];
      setData(filterUniquePages(newData));
      setTotalResults(response ? response?.total_results : 0);
    });
  };

  useEffect(() => {
    getGenres(selectedContent as string).then((response: GenresResponse) => {
      setGenresTypes(response);
    });
  }, [selectedContent]);

  useEffect(() => {
    setData([]);
    setPage(0);
    handleGetContent(true);
  }, [selectedContent, selectedSortBy, orderType]);

  useEffect(() => {
    if (selectedContent !== undefined) {
      handleGetContent(false);
    }
  }, [page]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight * 0.8) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(data);
  
  return (
    <div className='md:px-8 lg:px-[5%] bg-[#ECEFF1] pt-5'>
      <FilterContents handleGetContent={handleGetContent} isFilterHidden={isFilterHidden} selectedContent={selectedContent} genresTypes={genresTypes as GenresResponse} />
      <div className='flex flex-row pt-12 pb-10 mx-4 items-center justify-between gap-5 md:gap-10 max-w-[screen]'>
        <div className="flex flex-col min-w-[120px]">
          <span color="#8896a1">Total</span>
          <span className="text-xl font-normal text-nowrap flex flex-row">
            <div>{totalResults}</div>
            <div className='pl-2'>{selectedContent === 'tv' ? 'Tv Shows' : 'Movies'}</div>
          </span>
        </div>
        <div onClick={() => setFilterHidden(!isFilterHidden)} className="w-full md:w-1/3 h-10 border-r-4 min-w-[250px] bg-[#2196f3] flex justify-center items-center">
          <FilterAltIcon htmlColor='white' />
          <span className='text-white flex flex-row'>
            <div>Choose</div>
            <div className='pl-2'>{selectedContent === 'tv' ? 'Tv Shows' : 'Movies'}</div>
          </span>
        </div>
        <div className='flex flex-row'>
          <div className='bg-[#2E353D] h-10 w-10 p-1 flex justify-center items-center border-r-4 cursor-pointer'>
            {orderType === 'asc'
              ? <img onClick={() => setOrderType('desc')} src={ascendingIcon} alt="" />
              : <img onClick={() => setOrderType('asc')} src={descendingIcon} alt="" />}
          </div>
          <FilterList orderOptions={orderOptions} selectedSortBy={selectedSortBy} selectedContent={selectedContent} setSelectedSortBy={setSelectedSortBy} />
        </div>
      </div>
      <div className='mx-10 md:mx-0'>
        <div className='gap-x-60 gap-y-10 md:gap-6 grid grid-cols-3 md:grid-cols-5 cssClass-text w-full'>
          {data.map((items: Contents) => (
            <>
              
              {items.results.filter((item) => item.poster_path !== null && item?.original_language === 'en' && (selectedContent === 'tv' ? (item as unknown as TVShow)?.origin_country?.find((item) => item === "US" || item === "GB" || item === "NZ" || item === "AU" || item === "CA") : true)).map((item, index) => (
              <ContentListCard key={index} item={item} genresTypes={genresTypes} />
            ))}
            </>
            
          ))}
        </div>
      </div>
    </div>
  );
};
