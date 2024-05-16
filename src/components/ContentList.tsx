import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useState, useEffect } from 'react';
import { getShows, getGenres } from '../api/requests';
import { Shows, Show, GenresResponse } from '../types/types';
import { Link } from 'react-router-dom';

const orderOptions = [
  { value: "popularity", text: "Popularity" },
  { value: "rating", text: "Rating" },
  { value: "name", text: "Name" },
  { value: "year", text: "Year" },
  { value: "update_date", text: "Update date" },
  { value: "publication_date", text: "Publication date" }
];

export const ContentList = () => {
  const [totalResults, setTotalResults] = useState(0)
  const [isFilterHidden, setFilterHidden] = useState(true)
  const [showPreview, setShowPreview] = useState(0)
  const [data, setData] = useState<Shows | null>(null)
  const [genresTypes, setgenresTypes] = useState<GenresResponse | null>(null)

  useEffect(()=> {
    getGenres('tv').then((response:GenresResponse)=>{
      setgenresTypes(response)
    })
    getShows().then((response:Shows)=>{setData(response)})
    setTotalResults(data?data?.total_results:0)
  }, [])
  
  return (
    <div className='md:px-8 lg:px-[5%]'>
      <div hidden={isFilterHidden} className='min-h-60 mt-7 border-r-4 shadow-custom-content min-w-[100%] mx-auto'>
        <title>Choose TV show</title>
        <div>
          {/* Content here */}
        </div>
      </div>
      <div className='flex flex-row pt-12 pb-10  items-center justify-between gap-[20%] max-w-[screen]'>
        <div className="flex flex-col min-w-[121px]">
          <span color="#8896a1">Total</span>
          <span className="text-xl font-normal text-nowrap">{totalResults} TV Shows</span>
        </div>
        <div onClick={()=>setFilterHidden(!isFilterHidden)} className="w-full md:w-1/3 h-10 border-r-4 min-w-[250px] bg-[#2196f3] flex justify-center items-center">
          <FilterAltIcon htmlColor='white' />
          <span className='text-white '>Choose TV show</span>
        </div>
        <div className='flex flex-row'>
          <div className='bg-[#2E353D] min-h-8 w-10 flex justify-center items-center border-r-4'>
            <ReorderIcon htmlColor='white' />
          </div>
          <div>
            <select className='bg-[#2E353D] pl-3 pr-11 text-white h-full' id="cars">
              {orderOptions.map((item) => (
                <option className='bg-white text-black' value={item.value} key={item.value}>{item.text}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className=' gap-6 grid grid-cols-5 cssClass-text'>
          {data&& data.results.map((item:Show)=>(
            <Link onClick={()=>{localStorage.setItem("directedPageID", item.id.toString())}} key={item.id} to={`/${item.name}`}>
              <div onMouseEnter={()=>setShowPreview(item.id)} onMouseLeave={()=>setShowPreview(0)} className='w-[203px] h-[304px]'>
              <div hidden={showPreview === item.id}><img src={`${"https://image.tmdb.org/t/p/w500"+item.poster_path}`} alt="" /></div>
              <div hidden={showPreview !== item.id} className={`bg-[#2E353D] p-5 ${showPreview === item.id && "flex flex-col gap-1 relative w-[250px] -top-6 -left-5 rounded-sm h-[350px]"}`}>
                <span className='text-lg font-semibold'>{item.name}</span>
                <div className='flex flex-row flex-wrap gap-2 font-size-css'>
                  {item.genre_ids.map(genre_id => {
                    const genre = genresTypes?.genres.find(g => g.id === genre_id);
                    return genre ? <p className='pr-1' key={genre_id}>{genre.name}</p> : '';
                  }).filter(Boolean)}
                </div>
                <div className='flex flex-row font-size-css gap-1'>
                  <div>{item.first_air_date.substring(0, 4)}</div>
                  <div>Raiting: {parseFloat(item.vote_average.toFixed(1))}</div>
                </div>
                <p className='description-css'>{item.overview}</p>
              </div>
            </div>
            </Link>
            
          ))}
      </div>
    </div>
  );
};
