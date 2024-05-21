import React from 'react'
import MultipleSelectChip from './MultipleSelectChipMUI';
import { GenresResponse } from '../types/types';

interface FilterContents {
    isFilterHidden: boolean;
    selectedContent: string;
    genresTypes: GenresResponse
    handleGetContent: (isFirstPage: boolean) => void;
  }
const FilterContents: React.FC<FilterContents>  = ({isFilterHidden, selectedContent, genresTypes, handleGetContent}) => {
  return (
    <div hidden={isFilterHidden} className=' relative min-h-60 bg-white border-r-4 pt-4 shadow-custom-content w-full mx-auto'>
            <h2 className=' text-center text-xl font-medium'>Choose {selectedContent==='tv'? 'TV show': 'Movie'}</h2>
            <div className='flex items-center gap-40 mx-20'>
                <div>
                    <span>Select multiple genres</span>
                    <MultipleSelectChip genresTypes={genresTypes} />
                </div>
                <div>
                    <div className=' text-center'>First air date</div>
                    <div className='flex flex-row w-60 gap-20'>
                        <div className='flex flex-col'>
                            <span>From</span>
                            <input className=' border-2 border-solid border-black' type="date" name="" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <span>To</span>
                            <input className=' border-2 border-solid border-black' type="date" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={()=>handleGetContent(true)} className='px-2 py-1 bg-blue-600 text-white w-20 cursor-pointer text-center mt-10'>
                Search
            </div>
    </div>
  )
}

export default FilterContents