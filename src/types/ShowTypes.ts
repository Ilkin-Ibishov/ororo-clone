export interface Creator {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Episode {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  }
  
  export interface Network {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  export interface Season {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }
  
  export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  export interface TVShow {
    adult: boolean;
    backdrop_path: string | null;
    created_by: Creator[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    name: string;
    next_episode_to_air: Episode;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: { iso_3166_1: string; name: string }[];
    seasons: Season[];
    spoken_languages: Language[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  }
  
  export interface VideoResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }
  
  export interface VideoResponse {
    id: number;
    results: VideoResult[];
  }
  