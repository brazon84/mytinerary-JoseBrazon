import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';

const SignIn = () => {
    const [data, setData] = useState({
        email: "",
        password: "", 
    });
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

    };
    const [user, setUser] = useState(null); 

    const googleauth = async (data)=>{
        try{
            await axios.post("https://mytineraty-back-brazon84.vercel.app/users/login", data)
             .then(response => {
                setUser(response.data.user);
            });
    
            console.log(data);
        }
      catch (error) {
        console.error(error);
      }};

    const handleLogout = () => {
        setUser(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Envía los datos al servidor para autenticar al usuario
        axios.post('https://mytineraty-back-brazon84.vercel.app/users/login', {
            email: data.email,
            password: data.password
        })
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error('Error en la autenticación:', error);
            Swal.fire({
                icon: "error",
                title: "Error en la autenticación",
                text: "Credenciales incorrectas. Por favor, intenta de nuevo.",
            })
        })
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
                            <GoogleOAuthProvider clientId="345300445401-ffcd5tcp6mr0jcco4igp1geuu4bhqtqj.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(CredentialResponse) => {
              console.log("CredentialResponse");
              const infoUser = jwtDecode(CredentialResponse.credential);
              console.log(infoUser);
              setData({
                email: infoUser.email,
                password: "jose1234",
              });

              googleauth({
                email: infoUser.email,
                password: "jose1234",})
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
                    )}
                    {user && (
                        <div className="profile">
                            <h3>{user.name}</h3>
                            <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    <form className='d-flex justify-content-center flex-column' onSubmit={handleSubmit} >
                        <div className='d-flex justify-content-center flex-column'>
                            <label htmlFor='email'>Email:</label>
                            <input 
                            className='text-center'
                            name='email' 
                            type="email" 
                            placeholder='email'
                            onChange={handleChangeData} 
                            value={data.email} 
                             />
                        </div>
                        <div className='d-flex justify-content-center flex-column'>
                            <label htmlFor='password'>Password:</label>
                            <input 
                            className='text-center' 
                            type="password"
                            name='password' 
                            placeholder='password' 
                            onChange={handleChangeData}
                            value={data.password} />
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