import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer align-content-center align-items-center j gap-3'>
            <section className='icon_footer'>
                <h6>Social Networking</h6>
                <i className='icon bx bxl-facebook-circle'></i>
                <i className='icon bx bxl-instagram'></i>
                <i className='icon bx bxl-whatsapp'></i>
            </section>
            <nav className='navigation_footer'>
                <h6>Navigation</h6>
            <Link style={{textDecoration: 'none'}} to='/'>
                <i className='icon bx bx-home' ></i>
                </Link>
                <Link style={{textDecoration: 'none'}} to='/cities'>
                <i className='icon bx bxs-city'></i>
                </Link>
            </nav>

            <div className='name_footer'>
                <h6 className='text-white'>
                Copyright © - 2023 Jose. G Brazon. L
                </h6>
            </div>
        </div>

    )
}

export default Footer