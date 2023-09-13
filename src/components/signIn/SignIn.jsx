import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {

    const clientID = "345300445401-ffcd5tcp6mr0jcco4igp1geuu4bhqtqj.apps.googleusercontent.com";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const onSuccess = (response) => {
        setUser(response.profileObj);
        axios.post('http://localhost:8000/users/login')
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

    const onFailure = (response) => {
        console.log("Something went wrong");
    }

    const handleLogout = () => {
        setUser(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className=''>
            <div className="d-flex justify-content-center">
                <h1 className="fs-1 fw-bold" >SignIn</h1>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="text-center">
                    {!user && (
                        <div className='btn'>
                            <GoogleLogin
                                clientId={clientID}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                buttonText="Continue  with Google"
                            />
                        </div>
                    )}
                    {user && (
                        <div className="profile">
                            <img src={user.imageUrl} alt="Profile" />
                            <h3>{user.name}</h3>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    <form className='d-flex justify-content-center flex-column' onSubmit={handleSubmit} >
                        <div className='d-flex justify-content-center flex-column'>
                            <label htmlFor='email'>Email:</label>
                            <input className='text-center' type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label htmlFor='password'>Password:</label>
                            <input className='text-center' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                       <button type="submit" className="btn btn-primary mt-3">Sign In</button>
                    </form>
                </div>
            </div>
            <div className="justify-content-center d-flex mt-5 gap-3">
                <Link to="/">
                    <button type="button" className="btn btn-secondary">Close</button>
                </Link>
                <Link to="/users">
                    <button type="button" className="btn btn-primary">Sign Up</button>
                </Link>
            </div>
        </div>
    )
}


export default SignIn