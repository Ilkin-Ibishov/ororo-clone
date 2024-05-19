import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef } from 'react';
import { getSearchResults } from '../api/requests';
import { SearchResponse, SearchResult, Person } from '../types/types';

interface SearchBarProps {
  setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isInputFocused: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ setInputFocused, isInputFocused }) => {
  const [result, setResult] = useState<(SearchResult | Person)[][]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const resultDivRef = useRef<HTMLDivElement>(null);

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

  console.log(result);

  return (
    <div className='flex flex-col relative'>
      <SearchIcon className='absolute top-3 ml-3' />
      <input
        onChange={(event) => setInputText(event.target.value)}
        width="18.75rem"
        placeholder={"Search..."}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        className='bg-[#444b54] focus:w-96 w-32 border-r-8 py-3 pr-3 pl-10 border-transparent focus:border-transparent h-10'
        type="text"
      />
      <div
        ref={resultDivRef}
        className='w-96 absolute top-12 border-2 h-60 bg-white overflow-y-scroll text-black'
      >
        {result.map((items) => (
          items.map(item => (
            <div key={item.id} className='my-4 mx-2 flex flex-row gap-5'>
              <img src={'poster_path' in item? `${"https://image.tmdb.org/t/p/w500" + item.poster_path}`: 'profile_path' in item?`${"https://image.tmdb.org/t/p/w500" + 'profile_path'}`: undefined } className=' w-12' alt="Item poster" />
              <div>
                <div>{item.media_type === 'movie' && 'title' in item? item?.title : item.name}</div>
                <div>{item.media_type}</div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
