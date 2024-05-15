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

export interface Genre {
    id: number;
    name: string;
  }
  
export interface GenresResponse {
    genres: Genre[];
  }