import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contentpage } from "./pages/Content"
import { useState } from 'react';
import { SelectedContentProvider } from './SelectedContentContext';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NoPage from "./components/NoPage";
import Person from "./pages/Person";

function App() {
  const [selectedContent, setselectedContent] = useState<string>("tv")
  selectedContent
  return (
    <>
      <SelectedContentProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/tv" />} />
          <Route path="" element={<Navigate to="/tv" />} />
          <Route path="/tv" element={<Home setselectedContent={setselectedContent} />} />
          <Route path="/tv/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
          <Route path="/movie" element={<Home setselectedContent={setselectedContent} />} />
          <Route path="/movie/:contentName" element={<Contentpage setselectedContent={setselectedContent} />} />
          <Route path="/person/:personId" element={<Person setselectedContent={setselectedContent} />} />
          <Route path="/sign-up" element={<SignUp setselectedContent={setselectedContent} />} />
          <Route path="/login" element={<Login setselectedContent={setselectedContent} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </SelectedContentProvider>
    </>
  );
}

export default App;
