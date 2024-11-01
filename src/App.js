import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import ChatBot from "./components/ChatBot/ChatBot";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PasswordEmail from "./pages/PasswordEmail/PasswordEmail";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import CineLog from "./pages/CineLog/CineLog";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <ChatBot />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/passwordEmail' element={<PasswordEmail />} />
        <Route path='/passwordReset' element={<PasswordReset />} />
        <Route path='/cineLog' element={<CineLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
