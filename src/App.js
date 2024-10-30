import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
