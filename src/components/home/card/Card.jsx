import React from 'react'
import { Link } from 'react-router-dom'


const Card = () => {
  return (
    <div className='car text-white flex-wrap'>
        <h2 className='sud_title'>Find the perfect destination</h2>
        <p className='card_paragraph'>Our app will help you find the perfect path for your next trip. with an easy-to-use interface and a host of itinerary option, planning your next trip has never been easier.</p>
        <button className='view'><Link style={{textDecoration: 'none'}} to='/cities'>View More</Link></button>
    </div>
  )
}

export default Card