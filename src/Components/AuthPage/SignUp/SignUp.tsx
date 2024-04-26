import React, { useState, useRef } from 'react';

const SignUp: React.FC = () => {
    const [signupError, setSignupError] = useState<string | null>(null);
    const userName = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data ={
            UserName: userName.current?.value,
            Name: name.current?.value,
            Password: password.current?.value
        };
        console.log(data);
    
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
    
            const responseData = await response.json();
            
            console.log('Signup successful', responseData);
        } catch (error) {
            console.error('Signup failed', error);
            setSignupError('Signup failed. Please try again.');
        }
    };
    return (
        <div className='signup-form'>
            <div className='signup-form__header'>
                <h1>Sign up</h1>
            </div>
            <div className='signup-form__body'>
                <form onSubmit={signup}>
                    <div className='form-group'>
                        <label htmlFor='UserName'>Username</label>
                        <input type='text' id='UserName' name='UserName' ref={userName} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Name'>Name</label>
                        <input type='text' id='FirstName' name='FirstName' ref={name} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Password'>Password</label>
                        <input type='password' id='Password' name='Password' ref={password} />
                    </div>
                    <button type='submit'>Sign up</button>
                </form>
                { signupError && 
                    <div className='error-message'>{signupError}
                    </div>
                }
            </div>
        </div>
    );
    
};

export default SignUp;
