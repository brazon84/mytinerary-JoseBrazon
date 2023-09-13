import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const clientID = "345300445401-ffcd5tcp6mr0jcco4igp1geuu4bhqtqj.apps.googleusercontent.com";
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        country: '',
    });

    const createUser = async () => {
        try {
            await axios.post('http://localhost:8000/users', formData);
        } catch (error) {
            console.log(error);
        }
    };

    const onSuccess = async (response) => {
        console.log('Google login success:', response);
        setUser(response.profileObj);
        const userData = {
            email: response.profileObj.email,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
        };
        try {
            
            await axios.post('http://localhost:8000/users', userData);
            console.log('User registered successfully.');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    
    const onFailure = (response) => {
        console.log('Google login failure:', response);
    }
    
    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            await createUser(formData);
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                country: '',
            });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h1 className="fs-1 fw-bold">SignUp</h1>
            </div>
            <div className='d-flex justify-content-center'>
                {!user ? (
                    <div className='btn'>
                        <GoogleLogin
                            clientId={clientID}
                            onFailure ={onFailure}
                            onSuccess={onSuccess}
                            buttonText="Continue with Google"
                        />
                    </div>
                ) : (
                    <div className="profile">
                        <img src={user.imageUrl} alt="Profile" />
                        <h3>{user.name}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            <div className='justify-content-center d-flex align-items-center'>
                <div className="text-center">
                    <form className='d-flex justify-content-center flex-column gap-3' onSubmit={handleSignUp}>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>FirstName:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>LastName:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <label for="country">Country</label>
                        <select name="country" id="country" value={formData.country}  onChange={handleInputChange}>
                          <option value="chile">Chile</option>
                            <option value="ecuador">Ecuador</option>
                            <option value="argentina">Argentina</option>
                            <option value="venezuela">Venezuela</option>
                        </select>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-5">
                <Link to="/">
                    <button type="button" className="btn btn-secondary">Close</button>
                </Link>
                <Link to="/users/login">
                    <button type="button" className="btn btn-primary">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;



mytinerary-JoseBrazon