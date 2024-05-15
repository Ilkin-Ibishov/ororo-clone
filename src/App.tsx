import { Routes, Route } from "react-router-dom";
import { Home } from "./layouts/Home"
import { Contentpage } from "./layouts/ContentPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:contentName" element={<Contentpage />} />
      </Routes>
      
    </>
  )
}

export default App
