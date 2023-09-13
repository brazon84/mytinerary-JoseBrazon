import React from 'react'
import Card from './card/Card'
import data from '../../Api/Api.json'
import Carousel from './carousel/Carousel';

const img= data.cities;
const image= img[0].url;
const foto = "foto";

const Home = () => {
  return (
    <>
    <div className='card home bg-black'>
        <h2 className='fst-italic text-success p-3 mb-5 card' > "Find your perfect trip, designed by insiders who know and love their cities"</h2>
        <div className='card_home'>
          <section>
      <Card />
          </section>
          <section>
      <img className='img_home p-xxl-5' src={image} alt={foto} />
          </section>
      </div>
    </div>
      <section className='car_city card p-xxl-5 bg-black'>
                <h4 className='d-flex justify-content-center p-1 text-white'>Popular Mytineraries</h4>
           <Carousel />
            </section>
    </>
  )
}

export default Home