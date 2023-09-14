import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";


const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        Photo: "",
        terms: false,
    });
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { ...data }
        if (data.terms) {
            const requestData = {
                name: data.firstName + " " + data.lastName,
                email: data.email,
                password: data.password,

            };


            try {
                const response = await fetch.post("http://localhost:8000/users", { ...requestData });
                console.log("Datos de registro:", response.data);
                Swal.fire({
                    icon: "success",
                    title: "Register in!",
                    text: `Welcome, ${requestData.name}! You have successfully registered.`,
                });

            } catch (error) {
                console.error("Error al registrar:", error);
                Swal.fire({
                    icon: "error",
                    title: "Fail Register!",
                    text: ` ${error.response.data.message}!`,
                });

                setRegistrationStatus("error");
            }
        }
    };

    const renderAlert = () => {
        if (registrationStatus === "success") {
            return <div className="alert alert-success">Usuario registrado con éxito.</div>;
        } else if (registrationStatus === "error") {
            return <div className="alert alert-danger">Error al registrar el usuario.</div>;
        }
    };


    return (
        <form
            className="form d-flex justify-content-center align-items-center flex-column"
            
            onSubmit={handleSubmit}
        >
            <div className=' d-flex justify-content-center flex-column align-items-center text-center'>
                <h2 className='d-flex justify-content-center mb-5 fw-bold'> Sign Up </h2>

                <div className="d-flex justify-content-center">
                    <GoogleOAuthProvider clientId="345300445401-ffcd5tcp6mr0jcco4igp1geuu4bhqtqj.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={(CredentialResponse) => {
                                const infoUser = jwtDecode(CredentialResponse.credential);
                                setData({
                                    firstName: infoUser.given_name,
                                    lastName: infoUser.family_name,
                                    email: infoUser.email,
                                    password: "jose1234",
                                });
                                Swal.fire({
                                    icon: "success",
                                    title: "Register in!",
                                });
                            }}
                            onError={() => {
                                console.log("Login Failed");
                                Swal.fire({
                                    title: "Something went wrong!",
                                    icon: "error",
                                });
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
                <div className='justify-content-center d-flex align-items-center'>
                    <div className="text-center">
                        <div className='d-flex justify-content-center flex-column'>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChangeData}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChangeData}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>FirstName:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChangeData}
                            />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label>LastName:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChangeData}
                            />
                        </div>
                        <label htmlFor="country">Country</label>
                        <select name="country" id="country" value={data.country} onChange={handleChangeData}>  // Cambiado de formData.country a data.country
                            <option value="chile">Chile</option>
                            <option value="ecuador">Ecuador</option>
                            <option value="argentina">Argentina</option>
                            <option value="venezuela">Venezuela</option>
                        </select>
                        <div>
                        <button type="submit" className=" mt-5 btn btn-primary">Sign Up</button>
                        </div>
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
        </form >
    );
};

export default SignUp;