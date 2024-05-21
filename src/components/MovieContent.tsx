import React from 'react'
import { Movie } from '../types/MovieTypes';

interface MovieContent {
    data: Movie;
    trailer: string;
  }

const MovieContent: React.FC<MovieContent> = ({data, trailer}) => {
    data
  return (
    <div className='w-full'>
      <iframe
        className='w-full h-96'
        src={`https://www.youtube.com/embed/${trailer}`}
        frameBorder="2"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  )
}

export default MovieContent