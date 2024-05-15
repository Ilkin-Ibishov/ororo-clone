import React, { RefObject } from 'react';

interface TrailerFrameProps {
  trailerLinks: string[];
  setClickedTrailerIndex: React.Dispatch<React.SetStateAction<number>>;
  overlayRef: RefObject<HTMLDivElement>;
  clickedTrailerIndex: number;
}

export const TrailerFrame: React.FC<TrailerFrameProps> = ({ trailerLinks, setClickedTrailerIndex, overlayRef, clickedTrailerIndex }) => {

  return (
    clickedTrailerIndex !== -1 && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" ref={overlayRef}>
    <div className="relative w-[70%] h-[70%]">
      <button className="absolute top-0 -right-20 p-2 text-white" onClick={() => setClickedTrailerIndex(-1)}>Close</button>
      {trailerLinks.length > 0 && (
        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${trailerLinks[clickedTrailerIndex]}`} title="YouTube video player" allowFullScreen></iframe>
      )}
    </div>
  </div>
  )
};
