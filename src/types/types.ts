export interface previewDataType {
    id: number;
    name: string;
    description: string;
    rating: number;
    year: string;
    thumbnail: string;
    duration: string;
    genres: (string | number)[];
  }

export interface Shows {
    page: number,
    results: Show[],
    total_pages: number,
    total_results: number
}

export interface Show {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export interface Genre {
    id: number;
    name: string;
  }
  
export interface GenresResponse {
    genres: Genre[];
  }