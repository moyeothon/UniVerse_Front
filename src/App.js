import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
// import ChatBot from "./components/ChatBot/ChatBot";
import Main from "./pages/Main";
import { Diary } from "./pages/Diary/Diary";
import { Cinelog } from "./pages/CineLog/Cinelog";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PasswordEmail from "./pages/PasswordEmail/PasswordEmail";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      {/* <ChatBot /> */}
      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/passwordEmail' element={<PasswordEmail />} />
        <Route path='/passwordReset' element={<PasswordReset />} />

        <Route path='/diary' element={<Diary />} />
        <Route path='/cinelog' element={<Cinelog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
