import React from 'react';
import { Header } from '../components/Header';
import { ContentList } from '../components/ContentList';

interface Home {
  selectedContent: string;
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}
export const Home: React.FC<Home> = ({selectedContent, setselectedContent}) => {
  return (
    <>
      <Header setselectedContent={setselectedContent} />
      <ContentList selectedContent={selectedContent} />
    </>
  );
};
