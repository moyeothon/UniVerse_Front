import React, { useState } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
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
                // accessToken과 refreshToken을 로컬 스토리지에 저장
                console.log(data);
                localStorage.setItem('accessToken', data.result.accessToken);
                localStorage.setItem('refreshToken', data.result.refreshToken);
                alert('로그인 성공!');
            } else {
                setErrorMessage(data.message || '로그인 실패');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginContainer'>
                <div className='loginTitle'>LogIn</div>
                <div className='loginForm'>
                    <div className='input-container'>
                        <input 
                            type='text'
                            placeholder='Username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className='input-container'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                </div>
                <div className='loginButton' onClick={handleLogin}>LogIn</div>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                <div className='loginInfo'>
                    <NavLink to='/passwordEmail' className='forgotPasswordInfo'>Password Reset</NavLink>
                    <div className='border'>ㅣ</div>
                    <NavLink to='/signUp' className='signUpInfo'>Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
}
