import React, { useState } from 'react'
import './PasswordEmail.css'

export default function PasswordEmail() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

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
    
    return (
        <div className='passwordEmailPage'>
            <div className='passwordEmailContainer'>
                <div className='passwordEmailTitle'>Password Email</div>
                <div className='passwordEmailInfo'>비밀번호 재설정을 위해 가입했던 이메일을 입력해주세요.</div>
                <div className='passwordEmailForm'>
                    <div className='input-container'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            required 
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <div className='error-message'>{emailError}</div>}
                    </div>
                </div>
                <div className='passwordEmailButton'>Password Email</div>
            </div>
        </div>
    );
}
