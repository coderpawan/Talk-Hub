
import { useState, useContext } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { UserContext } from '../../../UserContext';
import { Redirect } from 'react-router-dom';
import img from '../../../account-image.png';

import '../signup/signup.css'


const clientId = "82449913701-a10nsdha9sb0mgo42u9emft6nr45asd5.apps.googleusercontent.com";



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
            const res = await fetch('https://ashutoshchatroom.herokuapp.com/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.errors) {
                console.log("hello");
                setemailError(data.errors.email);
                setpasswordError(data.errors.password);


            }

            if (data.user) {
                console.log("hello user");

                const newuser={
                    name:data.user.name,
                    _id:data.user._id,
                    email:data.user.email

                }


                console.log(newuser);

                setUser(newuser)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        console.log(res.profileObj.name);
        console.log(res.profileObj.googleId);

        const newuser = {
            name: res.profileObj.name,
            _id: res.profileObj.googleId,
            email: res.profileObj.email

        }


        setUser(newuser);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const responseFacebook = (response) => {
        console.log(response);
    }

    const componentClicked =(data)=>{
        console.log(data);
    }




    if (user) {
        return <Redirect to='/' />
    }
    return (

        <div className="main-w3layouts wrapper">

            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form onSubmit={submitt}>
                        <img class="logo" src={img} />
                        <h1></h1>
                        <input className="text email" type="email" name="email" value={email} onChange={e => setemail(e.target.value)} placeholder="Email" required />

                        <div className="name error red-text">{emailError}</div>
                        <input className="text" type="password" name="password" value={password} onChange={e => setpassword(e.target.value)} placeholder="Password" required />

                        <div className="name error red-text">{passwordError}</div>

                        <button class="btnsignup">Login</button>
                    </form>
                    <div className="row">
                        <p className="col s8">Or sign in by Google</p>
                    
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign In"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />

                

                    </div>

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







