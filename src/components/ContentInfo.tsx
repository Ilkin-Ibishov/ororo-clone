import React from 'react';
import { countries } from 'countries-list';
import { Country } from '../types/types';
import { TVShow } from '../types/ShowTypes';
import { Movie } from '../types/MovieTypes';

interface ContentInfoProps {
  data: TVShow | Movie | null;
}

export const ContentInfo: React.FC<ContentInfoProps> = ({ data }) => {
  const contentType = localStorage.getItem('selectedContent') as string;

  return (
    data && (
      <div>
        <p>Vote avarage: {parseFloat(data?.vote_average.toFixed(1))}</p>
        <p>Release year: {contentType === 'tv' ? (data as TVShow)?.first_air_date.substring(0, 4) : (data as Movie)?.release_date}</p>
        <div>
          <span>Genres:</span>
          <div className='grid grid-cols-2 gap-2 w-64'>
            {data.genres.map((genre, index) => (
              <span key={index} className="text-nowrap py-1 text-sm px-3 bg-blue-600 text-white text-center rounded-lg">{genre.name}</span>
            ))}
          </div>
        </div>
        <p>Countries: {(countries[data.origin_country[0] as keyof typeof countries] as Country)?.name}</p>
        <p>Duration: {contentType === 'tv' ? (data as TVShow).episode_run_time : (data as Movie)?.runtime}min</p>
        <p>Status: {contentType === 'tv' ? (data as TVShow).in_production ? "Returning Series" : "Ended" : (data as Movie)?.status}</p>
      </div>
    )
  );
};
