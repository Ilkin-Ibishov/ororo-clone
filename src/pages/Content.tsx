import { useEffect, useState, useRef } from "react"
import { Header } from "../components/Header"
import { getSpecificShow, getSpecificShowTrailer } from "../api/requests"
import { TVShow } from "../types/ShowTypes"
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import { TrailerFrame } from "../components/TrailerFrame"
import { ContentInfo } from "../components/ContentInfo"
import { TvShowSeasons } from "../components/TvShowSeasons"

interface Contentpage {
    selectedContent: string;
    setselectedContent: React.Dispatch<React.SetStateAction<string>>
  }
export const Contentpage: React.FC<Contentpage> = ({selectedContent, setselectedContent}) => {
    const id = localStorage.getItem("directedPageID") as string;
    const [data, setData] = useState<TVShow | null>(null)
    const [trailerLinks, setTrailerLinks] = useState<string[]>([])
    const [clickedTrailerIndex, setClickedTrailerIndex] = useState<number>(-1)
    const overlayRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        getSpecificShow(parseInt(id, 10)).then((response) => setData(response))
        getSpecificShowTrailer(parseInt(id, 10)).then((response) => setTrailerLinks(response))
    }, [id]);

    const handleTrailerClick = (index: number) => {
        setClickedTrailerIndex(index)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                setClickedTrailerIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <div className="w-screen h-screen">
            <TrailerFrame 
                trailerLinks={trailerLinks} 
                clickedTrailerIndex={clickedTrailerIndex} 
                setClickedTrailerIndex={setClickedTrailerIndex} 
                overlayRef={overlayRef} 
            />
            <Header selectedContent={selectedContent} setselectedContent={setselectedContent} />
            <div className=" px-40 mt-3 flex flex-row">
                <div className="w-[25%]">
                    <img className="w-64" src={`${"https://image.tmdb.org/t/p/w500" + (data?.poster_path || '')}`} alt="" />
                    <div className="flex flex-row w-fit gap-1">
                        {trailerLinks?.map((_link, index) => (
                            index > 2 ? null : (
                                <div onClick={() => handleTrailerClick(index)} key={index} className="w-20 cursor-pointer">
                                    <div className="flex items-center mt-4 bg-[#888] py-1 px-[0.5] w-20 rounded-sm">
                                        <LocalMoviesIcon className="text-white" />
                                        <p className=" text-white text-xs text-nowrap">Trailer {index+1}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    <ContentInfo data={data} />
                </div>
                <div className="w-[60%] pl-20">
                    <div className="pb-5">
                        <h2 className="text-xl font-bold">{data?.name}</h2>
                        <p className="show-overview-css">{data?.overview}</p>
                    </div>
                    {data !== null &&<TvShowSeasons data={data} />}
                </div>
            </div>
        </div>
    );
};
