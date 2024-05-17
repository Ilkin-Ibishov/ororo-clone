import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contentpage } from "./pages/Content"
import { useState } from 'react';

function App() {
  const [selectedContent, setselectedContent] = useState<string>("tv")

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/shows" />} />
        <Route path="/shows" element={<Home selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
        <Route path="/shows/:contentName" element={<Contentpage selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
        <Route path="/movies" element={<Home selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
        <Route path="/movies/:contentName" element={<Contentpage selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
      </Routes>
    </>
  );
}

export default App;
