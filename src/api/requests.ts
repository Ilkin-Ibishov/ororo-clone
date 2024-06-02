import axios from 'axios';
import { VideoResult } from '../types/ShowTypes';
import { ResponseForPerson } from '../types/PersonType';
import { SearchResponse } from '../types/types';
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

export const getContent=async(selectedContent:string, page:number, sort_by:string, selectedGenreIds:string)=>{
  const selectedFromDate = JSON.parse(localStorage.getItem('fromDate') as string)
  const selectedToDate = JSON.parse(localStorage.getItem('toDate') as string)
  const url = `https://api.themoviedb.org/3/discover/${selectedContent}?vote_average.gte=4&vote_count.gte=20&primary_release_date.gte=${selectedFromDate}&primary_release_date.lte=${selectedToDate}&first_air_date.gte=${selectedFromDate}&first_air_date.lte=${selectedToDate}`
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
      page: page,
      sort_by: sort_by,
      with_original_language: 'en',
      with_genres: selectedGenreIds,
      with_origin_country: 'US|GB|NZ|AU|CA'
    }
    :{
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: page,
      sort_by: sort_by,
      with_genres: selectedGenreIds,
      with_original_language: 'en',
      with_origin_country: 'US|GB|NZ|AU|CA|FR|GE|ES|IT',
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

export const getSpecificShow=async(id:string)=>{
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

export const getTrailers=async(id:string, selectedContent: string)=>{
  const url = `https://api.themoviedb.org/3/${selectedContent}/${id}/videos?language=en-US`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  };
  try {
    const response = await axios(url, options);
    const hrefs: string[] = response.data.results.filter((result: VideoResult)=> result.type === 'Trailer' || result.type === 'Teaser' ).map((item: VideoResult)=>item.key)    
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

export const getSpecificMovie = async(id:string)=>{
  const url = `https://api.themoviedb.org/3/movie/${id}`
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    },
    params: {
      language: 'en-US'
    }
  }
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('error: ' + error);
    throw error;
  }
}

export const getPerson = async (id: string) => {
  const urlPerson = `https://api.themoviedb.org/3/person/${id}`
  const urlPersonTvCredits = `https://api.themoviedb.org/3/person/${id}/tv_credits`
  const urlPersonMovieCredits = `https://api.themoviedb.org/3/person/${id}/movie_credits`
  const urlPersonImages = `https://api.themoviedb.org/3/person/${id}/images`
  let resultObj = {
    person: {},
    personTvCredits: {},
    personMovieCredits: {},
    personImages: {}
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  };
  
  try {
    resultObj.person = (await axios.get(urlPerson, options)).data
    resultObj.personTvCredits = (await axios.get(urlPersonTvCredits, options)).data
    resultObj.personMovieCredits = (await axios.get(urlPersonMovieCredits, options)).data
    resultObj.personImages = (await axios.get(urlPersonImages, options)).data
    return resultObj as ResponseForPerson;
  } catch (error) {
    console.error('error: ' + error);
    throw error;
  }
}

export const getPersonTVShowCredits = async (id: string) => {
  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
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

export const getPersonMovieCredits = async (id: string) => {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
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

export const getRecommendedContents = async (id: string) => {
  const selectedContent = localStorage.getItem('selectedContent') as string
  const urlPageOne = `https://api.themoviedb.org/3/${selectedContent}/${id}/recommendations?page=1`
  const urlPageTwo = `https://api.themoviedb.org/3/${selectedContent}/${id}/recommendations?page=2`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
    }
  };
  
  try {
    const responsePageOne: SearchResponse = (await axios.get(urlPageOne, options)).data
    const responsePageTwo: SearchResponse = (await axios.get(urlPageTwo, options)).data
    const result = [ ...responsePageOne.results, ...responsePageTwo.results ];
    return result
  } catch (error) {
    console.error('error: ' + error);
    throw error;
  }
}

export const getContentReviews = async () => {
  const selectedContent = localStorage.getItem('selectedContent') as string;
  const directedPageID = localStorage.getItem('directedPageID') as string;
  const url = `https://api.themoviedb.org/3/${selectedContent}/${directedPageID}/reviews?language=en-US&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${Auth_Token}`
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