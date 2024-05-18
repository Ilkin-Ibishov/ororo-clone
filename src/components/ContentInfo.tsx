// ContentInfo.tsx
import React from 'react';
import { TVShow } from '../types/ShowTypes';
import { countries } from 'countries-list';
import { Country } from '../types/types';

interface ContentInfoProps {
  data: TVShow | null;
}

export const ContentInfo: React.FC<ContentInfoProps> = ({ data }) => {
  return (
    data && (
      <div>
        <p>Rating: {parseFloat(data?.vote_average.toFixed(1))}</p>
        <p>Release year: {data?.first_air_date.substring(0, 4)}</p>
        <p>Genres: 
          <React.Fragment>
            {data.genres.map((genre, index) => (
              <span key={index} className="mr-1 inline">{genre.name}</span>
            ))}
          </React.Fragment>
        </p>
        <p>Countries: {(countries[data.origin_country[0] as keyof typeof countries] as Country)?.name}</p>
        <p>Duration: {data.episode_run_time}min</p>
        <p>Status: {data.in_production? "Returning Series": "Ended"}</p>
      </div>
    )
  );
};
