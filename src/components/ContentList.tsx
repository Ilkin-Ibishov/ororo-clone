import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useState, useEffect } from 'react';
import { getShows, getGenres } from '../api/requests';
import { Shows, Show, Genre, GenresResponse, previewDataType } from '../types/types';
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
  const [isFilterHidden, setFilterHidden] = useState(true)
  const [showPreview, setShowPreview] = useState(0)
  const [previewData, setpreviewData] = useState<previewDataType[] | []>([])
  
  useEffect(()=> {
    let genresTypes:GenresResponse = {
      genres:[{
        id: 0,
        name: ""
      }]
    }
    getGenres('tv').then((response:GenresResponse)=>{
      genresTypes = response
    })
    getShows().then((response:Shows)=>{
      setpreviewData([])
      console.log("shows", response);
      
      response.results.map((show:Show)=>(
        setpreviewData(prev=> [...prev, {
          id: show.id,
          name: show.name,
          description: show.overview,
          rating: parseFloat(show.vote_average.toFixed(1)),
          year: show.first_air_date.substring(0, 4),
          thumbnail: show.poster_path,
          duration: "43 min",
          genres: show.genre_ids.map(genre_id => {
            const genre = genresTypes.genres.find(g => g.id === genre_id);
            return genre ? genre.name : '';
          }).filter(Boolean)
        }])
      ))
    })
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
          <span className="text-xl font-normal">284 TV Shows</span>
        </div>
        <div className="w-full md:w-1/3 h-10 border-r-4 min-w-[250px] bg-[#2196f3] flex justify-center items-center">
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
          {previewData.map((item:previewDataType)=>(
            <Link onClick={()=>{localStorage.setItem("directedPageID", item.id.toString())}} key={item.id} to={`/${item.name}`}>
              <div onMouseEnter={()=>setShowPreview(item.id)} onMouseLeave={()=>setShowPreview(0)} className='w-[203px] h-[304px]'>
              <div hidden={showPreview === item.id}><img src={`${"https://image.tmdb.org/t/p/w500"+item.thumbnail}`} alt="" /></div>
              <div hidden={showPreview !== item.id} className={`bg-[#2E353D] p-7 ${showPreview === item.id && "flex flex-col gap-1 relative w-[250px] -top-5 -left-5 rounded-sm h-[350px]"}`}>
                <span className='text-lg font-semibold'>{item.name}</span>
                <div className='flex flex-row flex-wrap gap-1 font-size-css'>
                  {item.genres.map((genre:string | number)=>(
                    <span className='text-nowrap'>{genre}</span>
                  ))}
                </div>
                <div className='flex flex-row font-size-css gap-1'>
                  <div>{item.year}</div>
                  <div>Raiting: {item.rating}</div>
                </div>
                <p className='description-css'>{item.description}</p>
              </div>
            </div>
            </Link>
            
          ))}
      </div>
    </div>
  );
};
