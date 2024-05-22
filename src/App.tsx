import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contentpage } from "./pages/Content"
import { useState } from 'react';
import { SelectedContentProvider } from './SelectedContentContext';
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  const [selectedContent, setselectedContent] = useState<string>("tv")
  selectedContent
  return (
    <>
      <SelectedContentProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/tv" />} />
          <Route path="/tv" element={<Home setselectedContent={setselectedContent} />} />
          <Route path="/tv/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
          <Route path="/movie" element={<Home setselectedContent={setselectedContent} />} />
          <Route path="/movie/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
        </Routes>
        <ScrollToTopButton />
      </SelectedContentProvider>
    </>
  );
}

export default App;
