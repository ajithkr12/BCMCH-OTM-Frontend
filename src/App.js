import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import HomeTest from "./pages/Home.test";
import Pagination from "./pages/Pagination.test";

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/:uhid/:name" element={<Home />} />
          <Route path="/" element={<HomeTest />} />
          <Route path="/a" element={<Pagination />} />
        </Routes>
      </BrowserRouter>
    // <div className="App">
    //   <Home/>
    // </div>
  );
}

export default App;
