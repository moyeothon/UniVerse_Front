import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import ChatBot from "./components/ChatBot/ChatBot";
import Main from "./pages/Main/Main";
import { Diary } from "./pages/Diary/Diary";
import CineLog from "./pages/CineLog/CineLog";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PasswordEmail from "./pages/PasswordEmail/PasswordEmail";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import MeetMain from "./pages/Meet/MeetMain";
import MeetWrite from "./pages/Meet/MeetWrite";
import MeetDetail from "./pages/Meet/MeetDetail"

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
        <Route path='/meetMain' element={<MeetMain />} />
        <Route path='/meetWrite' element={<MeetWrite />} />
        <Route path='/meetDetail/:id' element={<MeetDetail />} />
        <Route path='/diary' element={<Diary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
