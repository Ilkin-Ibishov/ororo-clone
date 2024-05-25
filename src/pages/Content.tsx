import { useEffect, useState, useRef } from "react";
import { Header } from "../components/Header";
import { getSpecificShow, getTrailers } from "../api/requests";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { TrailerFrame } from "../components/TrailerFrame";
import { ContentInfo } from "../components/ContentInfo";
import { TvShowContent } from "../components/TvShowContent";
import MovieContent from "../components/MovieContent";
import { TVShow } from "../types/ShowTypes";
import { Movie } from "../types/MovieTypes";
import { getSpecificMovie } from "../api/requests";
import RecommendedContents from "../components/RecommendedContents";

interface Contentpage {
  setselectedContent: React.Dispatch<React.SetStateAction<string>>;
}

export const Contentpage: React.FC<Contentpage> = ({ setselectedContent }) => {
    const selectedContent = localStorage.getItem('selectedContent') as string
    const [id, setId] = useState(localStorage.getItem("directedPageID") || "");
    const [data, setData] = useState<TVShow | Movie | null>(null);
    const [trailerLinks, setTrailerLinks] = useState<string[]>([]);
    const [clickedTrailerIndex, setClickedTrailerIndex] = useState<number>(-1);
    const overlayRef = useRef<HTMLDivElement>(null);
    const idRef = useRef<string>(id);
    
    useEffect(() => {
        const interval = setInterval(() => {
        const newId = localStorage.getItem("directedPageID") || "";
        if (newId !== idRef.current) {
            idRef.current = newId;
            setId(newId);
        }
        }, 10)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (id && selectedContent === 'tv') {
            getSpecificShow(id).then((response) => setData(response))
            getTrailers(id, selectedContent).then((response) => setTrailerLinks(response))
        }
        if (id && selectedContent === 'movie'){
            getSpecificMovie(id).then((response)=> setData(response))
            getTrailers(id, selectedContent).then((response) => setTrailerLinks(response))
        }
    }, [id])

    const handleTrailerClick = (index: number) => {
        setClickedTrailerIndex(index);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
            setClickedTrailerIndex(-1);
        }};
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])
    
  return (
    <div className="w-full h-full md:-mx-5 mx-0">
      <TrailerFrame 
        trailerLinks={trailerLinks}
        clickedTrailerIndex={clickedTrailerIndex} 
        setClickedTrailerIndex={setClickedTrailerIndex} 
        overlayRef={overlayRef}
      />
      <Header setselectedContent={setselectedContent} />
        <div className="md:px-32 px-10 w-full md:mt-3 mt-1 flex md:flex-row flex-col">
          <h1 className="md:hidden text-2xl text-center pb-5 font-bold">{selectedContent === 'tv' && data?(data as TVShow).name : data &&(data as Movie).title}</h1>
          <div className="md:w-[30%] w-full flex flex-col">
            <img className="w-64 md:mx-0 mx-auto" src={`${"https://image.tmdb.org/t/p/w500" + (data?.poster_path || '')}`} alt="" />
            <div className="flex flex-row w-fit gap-1">
              {trailerLinks?.map((_link, index) => (
                index > 2 ? null : (
                  <div onClick={() => handleTrailerClick(index)} key={index} className="w-20 cursor-pointer">
                    <div className="flex items-center mt-4 bg-[#888] py-1 px-[0.5] w-20 rounded-sm">
                      <LocalMoviesIcon className="text-white" />
                      <p className="text-white text-xs text-nowrap">Trailer {index+1}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
            <ContentInfo data={data} />
          </div>
          <div className="md:w-[70%] w-full">
            <div className="pb-5">
              <h2 className="text-xl font-bold md:block hidden">{selectedContent === 'tv'
                ? (data as TVShow)?.name
                : (data as Movie)?.title}</h2>
              <h2 className="text-xl font-bold block md:hidden">Description</h2>
              <p className="show-overview-css w-full">{data?.overview}</p>
            </div>
            {data !== null && id !==null && selectedContent==='tv'
              ? <TvShowContent data={data as TVShow} id={id} />
              :selectedContent==='movie' && <MovieContent data={data as Movie} trailer={trailerLinks[0] as string} />}
              <RecommendedContents />
          </div>
        </div>
    </div>
  );
};
