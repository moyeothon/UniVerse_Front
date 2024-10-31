import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav";
import Main from "./pages/Main";
import { Diary } from "./pages/Diary";
import { Cinelog } from "./pages/Cinelog";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/diary' element={<Diary />} />
        <Route path='/cinelog' element={<Cinelog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
