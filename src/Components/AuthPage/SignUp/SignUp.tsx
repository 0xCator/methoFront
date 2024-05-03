import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backendPath } from '../../../Services/constants';
import Header from '../../Header/header';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState<string | null>(null);
    const userName = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data ={
            UserName: userName.current?.value,
            Name: name.current?.value,
            Email: email.current?.value,
            Password: password.current?.value
        };
        console.log(data);
    
        try {
            const response = await fetch(backendPath + '/api/Auth/register', {
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
            navigate("/login");
        } catch (error) {
            console.error('Signup failed', error);
            setSignupError('Signup failed. Please try again.');
        }
    };
    return (
    <>
        <Header/>
        <div className={`container col-sm-4 ${styles.container}`}>
            <div>
                <h1>Register</h1>
            </div>
            <div>
                <form onSubmit={signup}>
                <div className='form-group'>
                        <label htmlFor='Name'>Name</label>
                        <input type='text' id='Name' name='Name' ref={name} required className={`form-control ${styles.formcontrol}`}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='UserName'>Username</label>
                        <input type='text' id='UserName' name='UserName' ref={userName} required className={`form-control ${styles.formcontrol}`} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Email'>Email</label>
                        <input type='email' id='Email' name='Email' ref={email} required className={`form-control ${styles.formcontrol}`}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Password'>Password</label>
                        <input type='password' id='Password' name='Password' ref={password} required className={`form-control ${styles.formcontrol}`}/>
                    </div>
                    <button type='submit' className='btn btn-primary'>Register</button>
                </form>
                { signupError && 
                    <div className='error-message'>{signupError}
                    </div>
                }
                <br/>
                <p className='text-center'>Already have an account? <Link to="/login">Log in here!</Link></p>
            </div>
        </div>
    </>
    );
    
};

export default SignUp;
