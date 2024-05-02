import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';

const SignIn: React.FC = () => {
    const loginErrorRef = useRef<string | null>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            return;
        }

        console.log({ username, password });

        try {
            
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const responseData = await response.json();
            console.log('Login successful', responseData);
        } catch (error) {
            console.error('Login failed', error);
            loginErrorRef.current = 'Login failed. Please try again.';
        }
    };

    return (
        <div className={`container col-sm-4 ${styles.container}`}>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <form onSubmit={login}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' ref={usernameRef} className={`form-control ${styles.formcontrol}`} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' ref={passwordRef} className={`form-control ${styles.formcontrol}`} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </form>
                {loginErrorRef.current && 
                    <div className='error-message'>{loginErrorRef.current}</div>
                }
                <br/>
                <p className='text-center'>Don't have an account? <Link to="/register">Sign up here!</Link></p>
            </div>
        </div>
    );
};

export default SignIn;
