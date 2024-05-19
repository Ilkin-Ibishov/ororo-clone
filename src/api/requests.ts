import axios from 'axios';
import { VideoResult } from '../types/ShowTypes';
const Auth_Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGMxOTYzOGRhYjE5MDBhNWNlZDRkMzgwM2M4OGZkMSIsInN1YiI6IjY2NDI1NmY4YzYxYTQyNGEzNGU3ZjU3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ciyG6SR6CZYOFyoII0j6QUKAVviuNu1OV_q-k8e8q0"
export const orderOptionsMovie = [
  { value: "popularity", text: "Popularity" },
  { value: "title", text: "Title" },
  { value: "revenue", text: "Revenue" },
  { value: "primary_release_date", text: "Release date" },
  { value: "vote_count", text: "Rating" },
]
export const orderOptionsShow = [
  { value: "popularity", text: "Popularity" },
  { value: "name", text: "Title" },
  { value: "first_air_date", text: "First air date" },
  { value: "vote_count", text: "Rating" },
]

export const getContent=async(selectedContent:string, page:number, sort_by:string)=>{
  const url = `https://api.themoviedb.org/3/discover/${selectedContent}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    },
    params: selectedContent === 'tv'?
    {
      include_adult: false,
      include_null_first_air_dates: false,
      language: 'en-US',
      page: page +1,
      sort_by: sort_by,
      with_original_language: 'en'
    }
    :{
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: page + 1,
      sort_by: sort_by
    }
  }

  try {
    const response = await axios(url, options);
    return response.data
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
}

export const getSpecificShow=async(id:number)=>{
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  };
  try {
    const response = await axios(url, options);
    return response.data
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
  }
export const getGenres=async(selected:string)=>{
  const url = `https://api.themoviedb.org/3/genre/${selected}/list?language=en`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  }
  try {
    const response = await axios(url, options);
    return response.data
  } catch (error) {
    console.error('error:', error);
  }
}

export const getSpecificShowTrailer=async(id:number)=>{
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  };
  try {
    const response = await axios(url, options);
    const hrefs: string[] = response.data.results.map((result: VideoResult) => result.key)
    
    return hrefs;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
  }

export const getContenteasonEpisodes =async(show_id:number, season_number:number)=>{
  const url = `https://api.themoviedb.org/3/tv/${show_id}/season/${season_number}?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  }
  try {
    const response = await axios(url, options);
    return response.data 
  } catch (error) {
    console.error('error:', error);
  }
}

export const getSearchResults = async(input: string, page: number)=>{
  const url = 'https://api.themoviedb.org/3/search/multi';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Auth_Token}`
  },
  params: {
    query: input,
    include_adult: 'false',
    language: 'en-US',
    page: page
    }
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('error: ' + error);
    throw error;
  }
}