import React, { useState } from 'react'
import './PasswordReset.css'

export default function PasswordReset() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    return (
        <div className='passwordResetPage'>
            <div className='passwordResetContainer'>
                <div className='passwordResetTitle'>Password Reset</div>
                <div className='passwordResetForm'>
                    <div className='input-container'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            required 
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <div className='error-message'>{passwordError}</div>}
                    </div>
                    <div className='input-container'>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            required 
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && <div className='error-message'>{confirmPasswordError}</div>}
                    </div>
                </div>
                <div className='passwordResetButton'>Password Reset</div>
            </div>
        </div>
    );
}
