import { Link } from "react-router-dom";
import { ResponseForPerson, CastMemberForMovie, CastMemberForTvShow } from "../types/PersonType";

interface PersonCastsProps {
    data: ResponseForPerson | null;
    mediaType: string;
  }
  
const PersonCasts: React.FC<PersonCastsProps> = ({ data, mediaType }) => {
    const showType = mediaType === 'movie' ? data?.personMovieCredits?.cast : data?.personTvCredits?.cast
    
  return (<div className="grid grid-flow-col overflow-x-scroll w-full h-full gap-1">
    {showType?.map((show, index) => (
    <div key={index} className=" relative w-52 h-72 bg-[#2E353D] p-1 rounded-sm text-white" hidden={show.backdrop_path === null || show.genre_ids.includes(10767) || show.genre_ids.includes(10763) || show.genre_ids.length === 0 }>
                    <img src={`https://image.tmdb.org/t/p/w500${show?.backdrop_path || ''}`} alt="Movie photo" />
                    <div className="flex flex-col py-1">
                      <span className="text-center">{mediaType === 'movie' ? (show as CastMemberForMovie).title : (show as CastMemberForTvShow).name}</span>
                      <span>{mediaType === 'movie' ? (show as CastMemberForMovie).release_date.split('-')[0]: (show as CastMemberForTvShow).first_air_date.split('-')[0]}</span>
                      <span>{show.character}</span>
                      <span>Vote avarage: {show.vote_average.toFixed(1)}</span>
                      <Link onClick={() => { localStorage.setItem("directedPageID", show.id.toString()); localStorage.setItem('selectedContent', mediaType)}} to={`/${mediaType}/${show.id}`}>
                        <button className=" absolute bottom-2 left-[26%] bg-white rounded-lg px-2 py-1 text-black">Go to {mediaType === 'movie'? 'Movie' : 'Tv Show'}</button>
                      </Link>
                      
                    </div>
                  </div>))}
    </div>
  )
}

export default PersonCasts