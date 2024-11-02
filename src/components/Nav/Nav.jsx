import React, { useState } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Nav() {
    // 초기 로그인 상태를 로컬 스토리지 토큰으로 설정
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // 토큰 삭제
        setIsLoggedIn(false); // 상태 업데이트
    };

    return (
        <div className='nav'>
            <NavLink to='/' className='logo'>Logo</NavLink>
            <div className='top'>
                <NavLink to='/cineLog' className='cine-log'>Cine Log</NavLink>
                <NavLink to='/meetMain' className='meet'>Meet</NavLink>
                <NavLink to='/diary' className='diary'>Diary</NavLink>
            </div>
            <div className='right'>
                {isLoggedIn ? (
                    <div className='rightContainer'>
                        <div className='logout' onClick={handleLogout}>LogOut</div>
                        <div>
                            <IoPersonCircleSharp className='person' />
                        </div>
                    </div>
                ) : (
                    <>
                        <NavLink to='/login' className='login'>
                            <div>Login</div>
                        </NavLink>
                        <NavLink to='/signup' className='signUp'>
                            <div>Sign Up</div>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}
