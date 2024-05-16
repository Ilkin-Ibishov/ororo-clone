import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import { Contentpage } from "./pages/Content";

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
