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

export interface Country {
  capital: string;
  continent: string;
  currency: string[];
  languages: string[];
  name: string;
  native: string;
  phone: number[];
}
export interface KnownFor {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Person {
  id: number;
  original_name: string;
  media_type: string;
  adult: boolean;
  name: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownFor[];
}
export interface SearchResult {
  backdrop_path: string;
  id: number;
  original_name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  name?: string;
  title?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  video?: boolean;
}

export interface SearchResponse {
  page: number;
  results: (Person | SearchResult)[];
  total_pages: number;
  total_results: number;
}
