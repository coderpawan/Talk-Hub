import React, { useState, useContext } from 'react'
import { UserContext } from '../../../UserContext';
import { Redirect } from 'react-router-dom';
import Navbar from '../../Navbarsw';
import './signup.css'
const Signup = () => {
    const { user, setUser } = useContext(UserContext);
    const [name, setname] = useState('');
    const [age, setage] = useState('');
    const [number, setnumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [nameError, setnameError] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');

    const submitt = async (e) => {
        e.preventDefault();
        setemailError('');
        setnameError('');
        setpasswordError('');
        try {
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, age, number, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)
            if (data.errors) {
                setemailError(data.errors.email);
                setnameError(data.errors.name);
                setpasswordError(data.errors.password);
            }
            if (data.user) {

                const newuser = {
                    name: data.user.name,
                    _id: data.user._id,
                    email: data.user.email

                }

                console.log(newuser);

                setUser(newuser)
                localStorage.setItem('loginData', JSON.stringify(newuser));
            }
        } catch (error) {
            console.log(error)
        }

    }
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div className="main-w3layouts wrapper">
            <h1>Sign up to enjoy chatting</h1>
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form onSubmit={submitt}>
                        <input className="text" type="text" name="name" value={name} onChange={e => setname(e.target.value)} placeholder="Name" required />
                        <input className="text" type="number" name="age" value={age} onChange={e => setage(e.target.value)} placeholder="Age" required />
                        <div className="name error red-text">{nameError}</div>
                        <input className="text" type="number" name="number" value={number} onChange={e => setnumber(e.target.value)}  placeholder="Phone Number" required />
                        <input className="text email" type="email" name="email" value={email} onChange={e => setemail(e.target.value)} placeholder="Email" required />
                        <div className="name error red-text">{emailError}</div>
                        <input className="text" type="password" name="password" value={password} onChange={e => setpassword(e.target.value)}  placeholder="Password" required/>
                        <div className="name error red-text">{passwordError}</div>
                      
                        <div className="wthree-text">
                            <label className="anim">
                                <input type="checkbox" className="checkbox" required />
                                <span>I Agree To The Terms &amp; Conditions</span>
                            </label>
                            <div className="clear"> </div>
                        </div>
                        <div className="name error red-text">* fields are required</div>
                        <button class="btnsignup">Submit</button>
                    </form>
                    <p>Already have an account? <a href="/login"> Login Now!</a></p>
                    <p>Or go to <a href="/"> Home</a></p>
                </div>
                <div>
                    
                </div>
            </div>
            {/* copyright */}
            <div className="colorlibcopy-agile">
                <p>All rights reserved by <a href="https://flamboyant-franklin-be6c88.netlify.app/">www.ashutosh.com</a></p>
            </div>
        </div>


    )
}

export default Signup















