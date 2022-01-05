import React, { useState, useContext } from 'react'
import { UserContext } from '../../../UserContext';
import { Redirect } from 'react-router-dom';
import Navbar from '../../Navbarsw';
import './signup.css'
const Update = () => {
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
                method: 'PUT',
                
                body: JSON.stringify({ name, age, number, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)
            if (data.errors) {
                console.log("hello");
                setemailError(data.errors.email);
                setnameError(data.errors.name);
                setpasswordError(data.errors.password);


            }
            if (data.user) {
                setUser(data.user)
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
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form onSubmit={submitt}>
                        <input className="text" type="text" name="name" value={name} onChange={e => setname(e.target.value)} placeholder="Name" required />
                        <input className="text" type="number" name="age" value={age} onChange={e => setage(e.target.value)} placeholder="Age" required />
                        <div className="name error red-text">{nameError}</div>
                        <input className="text" type="number" name="number" value={number} onChange={e => setnumber(e.target.value)} placeholder="Phone Number" required />
                        <input className="text email" type="email" name="email" value={email} onChange={e => setemail(e.target.value)} placeholder="Email" required />
                        <div className="name error red-text">{emailError}</div>
                        <input className="text" type="password" name="password" value={password} onChange={e => setpassword(e.target.value)} placeholder="Password" required />
                        <div className="name error red-text">{passwordError}</div>
                        <div className="name error red-text">* fields are required</div>
                        <button class="btnsignup">Update Informations</button>
                    </form>
                </div>
                <div>

                </div>
            </div>
            {/* copyright */}
            <div className="colorlibcopy-agile">
                <p>All rights reserved by <a href="#">www.ashutosh.com</a></p>
            </div>
        </div>


    )
}

export default Update;















