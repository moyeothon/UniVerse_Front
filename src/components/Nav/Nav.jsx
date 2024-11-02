import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Nav() {
    const token = localStorage.getItem('accessToken');
    const isLoggedIn = !!token;

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
                    <div><IoPersonCircleSharp className='person' /></div>
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
