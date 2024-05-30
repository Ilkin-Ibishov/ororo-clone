import { SelectedTVShow } from "../types/ShowEpisodesTypes";
import { useState, useEffect } from "react";

interface EpisodesProps {
    episodesData: SelectedTVShow | null;
}

export const Episodes: React.FC<EpisodesProps> = ({ episodesData }) => {
    const [descriptionVisible, setDescriptionVisible] = useState(0)
    useEffect(() => {
      setDescriptionVisible(0)
    }, [episodesData])
    
    const formatDate = (dateString: string) => {
        const episodeDate = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - episodeDate.getTime();
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div className=" overflow-y-auto h-96">
            {episodesData && episodesData.episodes.map((episode, index) => (
                <div key={episode.id} className="flex flex-row justify-between min-w-full w-full py-2">
                    <div className="flex flex-row">
                        <p className="pr-2 index-color-css">{index + 1}</p>
                        <div>
                            <p className="episode-name-css">{episode.name}</p>
                            <div>
                                <p className="cursor-pointer text-xs" onClick={()=>setDescriptionVisible(prev=>index+1===prev? 0:index+1)}>show description</p>
                                {descriptionVisible === index+1 && <p>{episode.overview}</p>}
                            </div>
                        </div>
                    </div>
                    {formatDate(episode.air_date) !== '54 years ago' && <p className=" text-nowrap">{formatDate(episode.air_date)}</p>}
                </div>
            ))}
        </div>
    );
};
