import React from 'react'
import MultipleSelectChip from './MultipleSelectChipMUI';
import { GenresResponse } from '../types/types';
import { useRef } from 'react';

interface FilterContents {
    isFilterHidden: boolean;
    selectedContent: string;
    genresTypes: GenresResponse
    handleGetContent: (isFirstPage: boolean) => void;
  }
const FilterContents: React.FC<FilterContents>  = ({isFilterHidden, selectedContent, genresTypes, handleGetContent}) => {
    const fromDate = useRef<HTMLInputElement| null>(null)
    const toDate = useRef<HTMLInputElement | null>(null)
    localStorage.setItem('fromDate', JSON.stringify(fromDate.current? fromDate.current.value: ''))
    localStorage.setItem('toDate', JSON.stringify(toDate.current? toDate.current.value: ''))
    const handleSearch = async()=>{
        localStorage.setItem('fromDate', JSON.stringify(fromDate.current? fromDate.current.value: ''))
        localStorage.setItem('toDate', JSON.stringify(toDate.current? toDate.current.value: ''))
        await handleGetContent(true)
    }
    const handleDateClear =async()=>{
        if(fromDate.current && toDate.current){
            fromDate.current.value = ''
            toDate.current.value = ''
            localStorage.setItem('fromDate', JSON.stringify(fromDate.current? fromDate.current.value: ''))
            localStorage.setItem('toDate', JSON.stringify(toDate.current? toDate.current.value: ''))
            await handleGetContent(true)
        }
    }
  return (
    <div hidden={isFilterHidden} className=' relative min-h-60 bg-white border-r-4 pt-4 shadow-custom-content w-full mx-auto'>
            <h2 className=' text-center text-xl font-medium'>Choose {selectedContent==='tv'? 'TV show': 'Movie'}</h2>
            <div className='flex md:flex-row flex-col md:gap-52 gap-10 md:mx-20 mx-10'>
                <div>
                    <span>Select multiple genres</span>
                    <MultipleSelectChip genresTypes={genresTypes} />
                </div>
                <div>
                    <div className=' text-center'>First air date</div>
                    <div className='flex flex-row w-60 gap-10'>
                        <div className='flex flex-col'>
                            <span>From</span>
                            <input ref={fromDate} className=' border-2 border-solid border-black' type="date" name="" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <span>To</span>
                            <input ref={toDate} className=' border-2 border-solid border-black' type="date" name="" id="" />
                        </div>
                        <div className='pt-6 hidden md:block -ml-4 cursor-pointer' onClick={handleDateClear}>Clear</div>
                    </div>
                    <div className='pt-6 flex justify-center md:hidden cursor-pointer' onClick={handleDateClear}>Clear</div>
                </div>
                
            </div>
            <div onClick={()=>handleSearch()} className=' py-1 mx-[45%] bg-blue-600 text-white w-20 cursor-pointer text-center mt-10'>
                Search
            </div>
    </div>
  )
}

export default FilterContents