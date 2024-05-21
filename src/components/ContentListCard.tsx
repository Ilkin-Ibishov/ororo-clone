import { Link } from "react-router-dom";
import { ShowPreview, GenresResponse, MoviePreview } from "../types/types";
import { useState } from "react";

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
        <Link onClick={() => { localStorage.setItem("directedPageID", item.id.toString())}} key={item.id} to={`/${localStorage.getItem('selectedContent')}/${item.id}`}>
            <div onMouseEnter={() => setShowPreview(item.id)} onMouseLeave={() => setShowPreview(0)} className='w-52 h-80'>
                <div hidden={showPreview === item.id}>{item.poster_path?<img src={`${"https://image.tmdb.org/t/p/w500" + item.poster_path}`} alt="" />:<p className=" w-full py-[65%] px-10 bg-[#2E353D]">No poster photo from backend</p>}</div>
                <div hidden={showPreview !== item.id} className={`bg-[#2E353D] p-5 ${showPreview === item.id && "flex flex-col gap-1 relative w-[250px] -top-6 -left-5 rounded-sm h-[350px]"}`}>
                    <span className='text-lg font-semibold'>{isShow(item)? item.name: isMovie(item)? item.title: null}</span>
                    <div className='flex flex-row flex-wrap gap-2 font-size-css'>
                        {item.genre_ids.map(genre_id => {
                            const genre = genresTypes?.genres.find(g => g.id === genre_id)
                            return genre ? <p className='pr-1' key={genre_id}>{genre.name}</p> : ''
                        }).filter(Boolean)}
                    </div>
                    <div className='flex flex-row font-size-css gap-1'>
                        <div>{isShow(item) ? item.first_air_date?.substring(0, 4) : isMovie(item) ? item.release_date?.substring(0, 4) : null}</div>
                        <div>Raiting: {parseFloat(item.vote_average.toFixed(1))}</div>
                    </div>
                    <p className='description-css'>{item.overview}</p>
                </div>
            </div>
        </Link>
    );
};

