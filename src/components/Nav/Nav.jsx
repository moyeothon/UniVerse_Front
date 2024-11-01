import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <div className='nav'>
            <NavLink to='/' className='logo'>Logo</NavLink>
            <div className='top'>
                <NavLink to='/cineLog' className='cine-log'>Cine Log</NavLink>
                <div className='meet'>Meet</div>
                <div className='diary'>Diary</div>
            </div>
            <div className='right'>
                <NavLink to='/login' className='login'>
                    <div>Login</div>
                </NavLink>
                <NavLink to='/signup' className='signUp'>
                    <div>Sign Up</div>
                </NavLink>
            </div>
        </div>
    )
}
