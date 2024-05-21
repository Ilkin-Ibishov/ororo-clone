import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contentpage } from "./pages/Content"
import { useState } from 'react';

function App() {
  const [selectedContent, setselectedContent] = useState<string>("tv")

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/tv" />} />
        <Route path="/tv" element={<Home selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
        <Route path="/tv/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
        <Route path="/movie" element={<Home selectedContent={selectedContent} setselectedContent={setselectedContent} />} />
        <Route path="/movie/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
      </Routes>
    </>
  );
}

export default App;
