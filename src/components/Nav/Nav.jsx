import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <div id='nav'>
            <NavLink to='/' id='logo'>Logo</NavLink>
            <div id='top'>
                <div id='cine-log'>Cine Log</div>
                <div id='meet'>Meet</div>
                <div id='diary'>Diary</div>
            </div>
            <div id='right'>
                <NavLink to='/login' id='login'>
                    <div>Login</div>
                </NavLink>
                <NavLink to='/signup' id='sign-up'>
                    <div>Sign Up</div>
                </NavLink>
            </div>
        </div>
    )
}
