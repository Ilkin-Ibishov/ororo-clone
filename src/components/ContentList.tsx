import { useState, useEffect } from 'react';
import React from 'react';
import { getContent, getGenres } from '../api/requests';
import { Contents, GenresResponse } from '../types/types';
import { ContentListCard } from './ContentListCard';
import ascendingIcon from '../assets/ascending-sorting.png';
import descendingIcon from '../assets/descending-sorting.png';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Skeleton } from '@mui/material';
import { orderOptionsMovie, orderOptionsShow } from '../api/requests';
import { FilterList } from './FilterList';
import FilterContents from './FilterContents';


export const ContentList = () => {
  const selectedContent = localStorage.getItem('selectedContent') as string
  const orderOptions = selectedContent === 'movie' ? orderOptionsMovie : orderOptionsShow;
  const [orderType, setOrderType] = useState<string>('desc');
  const [selectedSortBy, setSelectedSortBy] = useState<string>(orderOptions[0].value);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isFilterHidden, setFilterHidden] = useState<boolean>(true);
  const [data, setData] = useState<Contents[]>([]);
  const [genresTypes, setGenresTypes] = useState<GenresResponse | null>(null);
  const [page, setPage] = useState<number>(1);

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

  const handleGetContent = async (isFirstPage: boolean) => {
    const requestedPage = isFirstPage ? 1 : page;
    const sort_by = selectedSortBy + '.' + orderType;
    const selectedGenres = JSON.parse(localStorage.getItem('selectedGenres') as string);
    const selectedGenreIds = genresTypes?.genres.filter(genre => selectedGenres?.includes(genre.name)).map(genre => genre.id).join(',');

    await getContent(selectedContent as string, requestedPage, sort_by, selectedGenreIds as string).then((response: Contents) => {
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
    setPage(1);
    handleGetContent(true);
  }, [selectedContent, selectedSortBy, orderType]);

  useEffect(() => {
    if (selectedContent !== undefined) {
      handleGetContent(false);
    }
  }, [page]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      setPage(prevPage => prevPage + 1)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log('data', data);
  
  return (
    <div className='md:px-8 lg:px-[5%] px-0 bg-[#ECEFF1]'>
      <FilterContents handleGetContent={handleGetContent} isFilterHidden={isFilterHidden} selectedContent={selectedContent} genresTypes={genresTypes as GenresResponse} />
      <div className='flex md:flex-row flex-col md:pt-12 pt-3 pb-10 items-center justify-between gap-5 md:gap-10 w-full'>
        <div className="flex md:flex-col flex-row md:gap-0 gap-3 min-w-[120px]">
          <span color="#8896a1" className='text-xl'>Total</span>
          <span className="text-xl font-normal text-nowrap flex-nowrap flex flex-row">
            <div className=' text-stone-500'>{totalResults}</div>
            <div className='pl-2'>{selectedContent === 'tv' ? 'Tv Shows' : 'Movies'}</div>
          </span>
        </div>
        <div onClick={() => setFilterHidden(!isFilterHidden)} className="md:w-1/3 w-80 h-10 border-r-4 min-w-[250px] bg-[#2196f3] flex justify-center items-center cursor-pointer">
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
      <div className='mx-4 md:mx-0'>
      <div className='gap-x-3 gap-y-10 md:gap-6 grid grid-cols-3 md:grid-cols-5 cssClass-text w-full'>
        {data.map((items: Contents, itemsIndex) => (
          <React.Fragment key={itemsIndex}>
            {items.results.filter((item) => item.poster_path !== null).map((item) => (
              <ContentListCard key={item.id} item={item} genresTypes={genresTypes} />
            ))}
          </React.Fragment>
        ))}
        {/* Default loading skeleton */}
        {totalResults > 20 && [0, 1, 2, 3, 4].map((index) => (
          <div key={index}>
            <Skeleton
              className='w-28 h-40 md:w-52 md:h-80 md:py-40 py-20'
              variant="rectangular"
            />
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};
