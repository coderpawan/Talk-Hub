import Navbar from '../../Navbarsw';
import React, { useState, useContext } from 'react'
import { UserContext } from '../../../UserContext';
import { Redirect } from 'react-router-dom';
import img from '../../../account-image.png';

import '../signup/signup.css'


const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');

    const submitt = async (e) => {
        e.preventDefault();
        // console.log(name,age,number,email,password);
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)

            if (data.errors) {
                console.log("hello");
                setemailError(data.errors.email);
                setpasswordError(data.errors.password);


            }
            if (data.user) {
                console.log("hello user");
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return <Redirect to='/' />
    }
    return (

        <div className="main-w3layouts wrapper">
            
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form onSubmit={submitt}>
                        <img class="logo" src={img}/>
                        <h1></h1>
                        <input className="text email" type="email" name="email" value={email} onChange={e => setemail(e.target.value)} placeholder="Email" required />

                        <div className="name error red-text">{emailError}</div>
                        <input className="text" type="password" name="password" value={password} onChange={e => setpassword(e.target.value)} placeholder="Password" required />

                        <div className="name error red-text">{passwordError}</div>

                        <button class="btnsignup">Login</button>
                    </form>
                    <p>Don't have an Account? <a href="/signup"> Sign-up!</a></p>
                    <p>Or go to <a href="/"> Home</a></p>
                </div>
            </div>
            <div className="colorlibcopy-agile">
                <p>All rights reserved by <a href="https://flamboyant-franklin-be6c88.netlify.app/">www.ashutosh.com</a></p>
            </div>
        </div>

    )
}

export default Login;







