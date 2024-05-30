import React from 'react';
import { Header } from '../components/Header';
import { ContentList } from '../components/ContentList';
import ScrollToTopButton from '../components/ScrollToTopButton';

interface Home {
  setselectedContent: React.Dispatch<React.SetStateAction<string>>
}
export const Home: React.FC<Home> = ({ setselectedContent}) => {
  return (
    <>
      <Header setselectedContent={setselectedContent} />
      <ContentList />
      <ScrollToTopButton />
    </>
  );
};
