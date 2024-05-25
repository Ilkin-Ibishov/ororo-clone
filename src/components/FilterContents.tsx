import React from 'react'
import MultipleSelectChip from './MultipleSelectChipMUI';
import { GenresResponse } from '../types/types';
import { useRef } from 'react';

interface FilterContents {
  isFilterHidden: boolean;
  selectedContent: string;
  genresTypes: GenresResponse;
  handleGetContent: (isFirstPage: boolean) => void;
}

const FilterContents: React.FC<FilterContents> = ({ isFilterHidden, selectedContent, genresTypes, handleGetContent }) => {
  const fromDate = useRef<HTMLInputElement | null>(null)
  const toDate = useRef<HTMLInputElement | null>(null)

  const handleSearch = async () => {
    localStorage.setItem('fromDate', JSON.stringify(fromDate.current ? fromDate.current.value : ''))
    localStorage.setItem('toDate', JSON.stringify(toDate.current ? toDate.current.value : ''))
    await handleGetContent(true)
  }

  const handleDateClear = async () => {
    if (fromDate.current && toDate.current) {
      fromDate.current.value = ''
      toDate.current.value = ''
      localStorage.setItem('fromDate', JSON.stringify(fromDate.current ? fromDate.current.value : ''))
      localStorage.setItem('toDate', JSON.stringify(toDate.current ? toDate.current.value : ''))
      await handleGetContent(true)
    }
  }

  return (
    <div hidden={isFilterHidden} className='relative min-h-60 bg-white border-r-4 pt-6 shadow-lg w-full mx-auto'>
      <h2 className='text-center text-2xl font-semibold mb-6'>Choose {selectedContent === 'tv' ? 'TV Show' : 'Movie'}</h2>
      <div className='flex flex-col md:flex-row md:gap-10 gap-6 md:mx-20 mx-6'>
        <div>
          <label className='block text-lg text-center font-medium mb-2'>Select multiple genres</label>
          <MultipleSelectChip genresTypes={genresTypes} />
        </div>
        <div>
          <div className='text-center text-lg font-medium mb-2'>First Air Date</div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col'>
              <label className='block text-sm font-medium mb-1'>From</label>
              <input ref={fromDate} className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' type="date" />
            </div>
            <div className='flex flex-col'>
              <label className='block text-sm font-medium mb-1'>To</label>
              <input ref={toDate} className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500' type="date" />
            </div>
            <button onClick={handleDateClear} className='mt-4 md:mt-5 md:ml-4 px-4 text-white py-1 text-nowrap bg-red-500 rounded-lg transition duration-200'>Clear Dates</button>
          </div>
        </div>
      </div>
      <div onClick={handleSearch} className='mt-6 py-2 mx-auto bg-blue-600 text-white w-32 cursor-pointer text-center rounded-lg hover:bg-blue-700 transition duration-200'>
        Search
      </div>
    </div>
  )
}

export default FilterContents
