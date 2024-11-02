import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://moyeothon.limikju.com:8080/api/members/login', {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            if (data.isSuccess) {
                localStorage.setItem('accessToken', data.result.accessToken);
                alert('로그인 성공!');
                navigate('/');
            } else {
                setErrorMessage(data.message || '로그인 실패');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginContainer'>
                <div className='loginTitle'>LogIn</div>
                <div className='loginForm'>
                    <div className='inputContainer'>
                        <input 
                            type='text'
                            placeholder='Username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required 
                        />
                    </div>
                    <div className='inputContainer'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required 
                        />
                    </div>
                </div>
                <div className='loginButton' onClick={handleLogin}>LogIn</div>
                {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
                <div className='loginInfo'>
                    <NavLink to='/passwordEmail' className='forgotPasswordInfo'>Password Reset</NavLink>
                    <div className='border'>ㅣ</div>
                    <NavLink to='/signUp' className='signUpInfo'>Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
}
