import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getSearchResults } from '../api/requests';
import { SearchResponse, SearchResult, Person } from '../types/types';
import emptyAvatar from '../assets/artist-empty-avatar.png'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchBarMobile() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<(SearchResult | Person)[][]>([]);
  const [inputText, setInputText] = useState<string>("");
  const inputTextRef = useRef<HTMLInputElement | null>(null);
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
    const handleScroll = () => {
      if (resultDivRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = resultDivRef.current;
        if (scrollTop + clientHeight >= scrollHeight -10) {
          setPage(prev => prev + 1)
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
    const fetchMoreResults = async () => {
      const response: SearchResponse = await getSearchResults(inputText, page);
      setResult(prev => [...prev, response.results]);
    };

    if (page > 1) {
      fetchMoreResults();
    }
  }, [page, inputText]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    setPage(1)
    setResult([])
    if (resultDivRef.current) {
      resultDivRef.current.scrollTop = 0;
    }

    if (inputTextRef.current) {
        inputTextRef.current.value = '';
      }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Search className='text-white scale-150' />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{fontSize: '20px', bgcolor: '#2E353D', color: 'white'}}>{"Search Movies, TV Shows, Actors"}</DialogTitle>
        <DialogContent sx={{ height: '30rem', bgcolor: '#2E353D' }}>
            <input
                ref={inputTextRef}
                onChange={(event) => setInputText(event.target.value)}
                placeholder={"Search..."}
                className={` mt-3 border-solid text-black w-full rounded-3xl py-3 pl-6 h-10`}
                type="text"
            />
            <div
                ref={resultDivRef}
                className='w-full absolute left-0 border-2 h-[27rem] bg-white overflow-y-scroll text-black rounded-lg'
                hidden={result.length === 0}
            >
                {result.map((items) => (
                items.map(item => (
                    <Link key={item.id} onClick={() => { localStorage.setItem("directedPageID", item.id.toString()); handleClose() }} to={`/${item.media_type}/${item.id}`}>
                        <div className='my-4 mx-2 flex flex-row gap-5'>
                    <img 
                        className=' w-12' 
                        alt="Item poster"
                        src={
                            'poster_path' in item
                            ? `${"https://image.tmdb.org/t/p/w500" + item.poster_path}`
                            : 'profile_path' in item && item.profile_path !== null
                            ?`${"https://image.tmdb.org/t/p/w500" + item.profile_path}`
                            : emptyAvatar } 
                        />
                    <div>
                        <div>{item.media_type === 'movie' && 'title' in item? item?.title : item.name}</div>
                        <div>{item.media_type === 'movie'?"Movie": item.media_type === 'tv'? "Tv Show": "Actor"}</div>
                    </div>
                    </div>
                    </Link>
                ))
                ))}
            </div>
        </DialogContent>
        <DialogActions className=' text-white bg-[#2E353D] w-full'>
          <button className='mx-auto' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
