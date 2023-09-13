import React from 'react'
import { Link } from 'react-router-dom'
import SingUp from '../signUp/SignUp'

const Nav = () => {
  return (
    <div className='navigation'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>My Tinerary</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cities">Cities</Link>
              </li>
              <Link to="/users/login">
                <button type="button" className='login'>
                  <i className='bx bxs-user'></i> Login
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </nav >

      <hr />
    </div>
  )
}

export default Nav