import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        if (!validateEmail(value) && value !== '') {
            setEmailError('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        
        if (!validatePassword(value)) {
            setPasswordError('비밀번호는 8-30자의 영문, 숫자, 특수문자를 포함해야 합니다.');
        } else {
            setPasswordError('');
        }

        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        
        if (value !== password) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSignUp = async () => {
        if (emailError || passwordError || confirmPasswordError || !email || !password || !username || !nickname) {
            alert('모든 필드를 올바르게 입력해주세요.');
            return;
        }
    
        try {
            const response = await axios.post('http://moyeothon.limikju.com:8080/api/members', {
                username: username,
                password: password,
                email: email,
                nickname: nickname
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': '*/*'
                }
            });
    
            if (response.data.isSuccess) {
                alert('회원가입 성공!');
                navigate('/login');
            } else {
                alert(`회원가입 실패: ${response.data.message}`);
            }
        } catch (error) {
            console.error('회원가입 중 에러 발생:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSignUp();
        }
    };

    return (
        <div className='loginPage'>
            <div className='loginContainer'>
                <div className='loginTitle'>SignUp</div>
                <div className='loginForm'>
                    <div className='inputContainer'>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='inputContainer'>
                        <input 
                            type='text' 
                            placeholder='Nickname' 
                            required 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='inputContainer'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            required 
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyDown={handleKeyDown}
                        />
                        {passwordError && <div className='errorMessage'>{passwordError}</div>}
                    </div>
                    <div className='inputContainer'>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            required 
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onKeyDown={handleKeyDown}
                        />
                        {confirmPasswordError && <div className='errorMessage'>{confirmPasswordError}</div>}
                    </div>
                    <div className='inputContainer'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            required 
                            value={email}
                            onChange={handleEmailChange}
                            onKeyDown={handleKeyDown}
                        />
                        {emailError && <div className='errorMessage'>{emailError}</div>}
                    </div>
                </div>
                <div className='signUpButton' onClick={handleSignUp}>SignUp</div>
            </div>
        </div>
    );
}
