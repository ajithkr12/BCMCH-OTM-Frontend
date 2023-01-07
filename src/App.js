import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import HomeTest from "./pages/Home.test";
// import ParentComponent from "./test/Parent";



function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/:doctorId/:patientId" element={<Home />} />
            <Route path="/" element={<HomeTest />} />
          </Routes>
          
        </BrowserRouter>
  );
}

export default App;
