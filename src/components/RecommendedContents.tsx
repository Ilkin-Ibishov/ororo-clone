import { useEffect, useRef, useState } from "react";
import { ShowPreview, MoviePreview, GenresResponse } from "../types/types";
import { ContentListCard } from "./ContentListCard";
import { getGenres, getRecommendedContents } from "../api/requests";

const RecommendedContents = () => {
  const selectedContent = localStorage.getItem('selectedContent') as string;
  const directedPageID = localStorage.getItem('directedPageID') as string;
  const [data, setData] = useState<ShowPreview[] | MoviePreview[] | []>([]);
  const [genresTypes, setGenresTypes] = useState<GenresResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRecommendedContents(directedPageID).then((response) => setData(response as (ShowPreview[] | MoviePreview[])));
    getGenres(selectedContent as string).then((response: GenresResponse) => {
      setGenresTypes(response);
    });
  }, [selectedContent, directedPageID]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };

    const refCurrent = scrollRef.current;
    refCurrent?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      refCurrent?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="md:mt-20 mt-5">
        <span className=" text-black text-2xl">Similar {selectedContent === 'tv'? 'Tv Shows' : 'Movies'}</span>
        <div
        ref={scrollRef}
        className='gap-x-3 gap-y-10 md:gap-6 flex overflow-x-scroll overflow-y-hidden cssClass-text w-full h-96 items-center'
        >
            {data.filter((item) => item.poster_path !== null).map((item) => (
            <ContentListCard key={item.id} item={item} genresTypes={genresTypes} />
        ))}
        </div>
    </div>
    
  );
};

export default RecommendedContents;
