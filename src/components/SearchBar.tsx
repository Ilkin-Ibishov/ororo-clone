import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef } from 'react';
import { getSearchResults } from '../api/requests';
import { SearchResponse, SearchResult, Person } from '../types/types';
import emptyAvatar from '../assets/artist-empty-avatar.png';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isInputFocused: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ setInputFocused, isInputFocused }) => {
  const [result, setResult] = useState<(SearchResult | Person)[][]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const resultDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (inputText) {
        const response: SearchResponse = await getSearchResults(inputText, 1);
        setResult([]);
        setResult(prev => [...prev, response.results]);
      } else {
        setResult([]);
      }
    };

    fetchResults();
  }, [inputText]);

  useEffect(() => {
    const fetchMoreResults = async () => {
      const response: SearchResponse = await getSearchResults(inputText, page);
      setResult(prev => [...prev, response.results]);
    };

    if (page > 1) {
      fetchMoreResults();
    }
  }, [page, inputText]);

  useEffect(() => {
    const handleScroll = () => {
      if (resultDivRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = resultDivRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setPage(prev => prev + 1);
        }
      }
    };

    if (resultDivRef.current) {
      resultDivRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (resultDivRef.current) {
        resultDivRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [resultDivRef]);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setInputFocused(false);
        await setPage(1)
        await setResult([])
        if(inputRef.current){
          inputRef.current.value = ''
        }
        if(resultDivRef.current) {
          resultDivRef.current.scrollTop = 0;
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setInputFocused]);
  const handleClick = (id: string, type: string ) => {
    localStorage.setItem("directedPageID", id)
    localStorage.setItem("selectedContent", type)
  }
  
  return (
    <div ref={containerRef} className='flex flex-col relative' onFocus={() => setInputFocused(true)}>
      <SearchIcon className='absolute top-3 ml-3' />
      <input
        ref={inputRef}
        onChange={(event) => setInputText(event.target.value)}
        width="18.75rem"
        placeholder={"Search..."}
        className={`bg-[#444b54] ${isInputFocused ? 'w-96' : 'w-32'} border-r-8 py-3 pr-3 pl-10 border-transparent h-10`}
        type="text"
      />
      <div
        ref={resultDivRef}
        hidden={!isInputFocused || result[0] === undefined || result[0].length === 0}
        className='w-96 absolute top-12 border-2 h-96 bg-white overflow-y-scroll text-black'>
        {result.map((items) => (
          items.map(item => (
            <Link key={item.id} onClick={() => handleClick(item.id.toString(), item.media_type)} to={`/${item.media_type}/${item.id}`}>
              <div className='my-2 mx-2 flex flex-row gap-5'>
                <img
                  className='w-12'
                  alt="Item poster"
                  src={
                    'poster_path' in item
                      ? `${"https://image.tmdb.org/t/p/w500" + item.poster_path}`
                      : 'profile_path' in item && item.profile_path !== null
                        ? `${"https://image.tmdb.org/t/p/w500" + item.profile_path}`
                        : emptyAvatar
                  }
                />
                <div>
                  <div>{item.media_type === 'movie' && 'title' in item ? item?.title : item.name}</div>
                  <div className=" text-stone-500 text-sm">{item.media_type === 'movie' ? "Movie" : item.media_type === 'tv' ? "Tv Show" : (item as Person).gender === 2 ? 'Actor' : 'Actress'}</div>
                </div>
              </div>
            </Link>
          ))
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
