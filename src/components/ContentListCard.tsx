import { Link } from "react-router-dom";
import { ShowPreview, GenresResponse, MoviePreview } from "../types/types";
import { useState } from "react";
import { motion } from "framer-motion";

interface ContentListCardProps {
    item: ShowPreview | MoviePreview;
    genresTypes: GenresResponse | null;
}

export const ContentListCard: React.FC<ContentListCardProps> = ({ item, genresTypes }) => {
    const [showPreview, setShowPreview] = useState(0)
    const isShow = (item: ShowPreview | MoviePreview): item is ShowPreview => {
        return (item as ShowPreview).first_air_date !== undefined;
    }
    const isMovie = (item: ShowPreview | MoviePreview): item is MoviePreview => {
        return (item as MoviePreview).release_date !== undefined;
    };
    
    return (
        <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{
                    scale: 0.9,
                    borderRadius: "100%"
                }}
            >
            <Link onClick={() => { localStorage.setItem("directedPageID", item.id.toString())}} key={item.id} to={`/${localStorage.getItem('selectedContent')}/${item.id}`}>
                <div onMouseEnter={() => setShowPreview(item.id)} onMouseLeave={() => setShowPreview(0)} className='md:w-52 md:h-80 w-28 h-40'>
                    <div hidden={showPreview === item.id}>{item.poster_path?<img src={`${"https://image.tmdb.org/t/p/w500" + item.poster_path}`} alt="" />:<p className=" md:w-full w-28 py-[65%] px-10 bg-[#2E353D]">No poster photo from backend</p>}</div>
                    <div hidden={showPreview !== item.id} className={`bg-[#2E353D] p-3 ${showPreview === item.id && "flex flex-col gap-1 relative w-full h-80 rounded-md"}`}>
                        <span className='text-lg font-semibold'>{isShow(item)? item.name: isMovie(item)? item.title: null}</span>
                        <div className='flex flex-row flex-wrap gap-2 font-size-css'>
                            {item.genre_ids.map(genre_id => {
                                const genre = genresTypes?.genres.find(g => g.id === genre_id)
                                return genre ? <p className='pr-1' key={genre_id}>{genre.name}</p> : ''
                            }).filter(Boolean)}
                        </div>
                        <div className='flex flex-row font-size-css gap-4'>
                            <div>{isShow(item) ? item.first_air_date?.substring(0, 4) : isMovie(item) ? item.release_date?.substring(0, 4) : null}</div>
                            <div>Rating: {parseFloat(item.vote_average.toFixed(1))}</div>
                        </div>
                        <p className='description-css'>{item.overview}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
        
    );
};

