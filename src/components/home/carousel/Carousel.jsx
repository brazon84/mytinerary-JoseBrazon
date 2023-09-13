import React, { useState } from 'react';
import data from '../../../Api/Api.json';

const city = data.cities;

// Función para dividir el array en grupos de tamaño especificado (en este caso, 4)
function getArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const Carousel = () => {
  const carouselItems = getArray(city, 4);


  return (
    <div className='carousel'>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators mb-5">
          {carouselItems.map((_, index) => (
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              key={index}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {carouselItems.map((group, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              data-bs-interval="2500"
              key={index}
            >
              <div className="row">
                {group.map((cityItem) => (
                  <div className="col-md-3 car_carousel" key={cityItem.id}>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={cityItem.url}
                        className="image"
                        alt={cityItem.firstName}
                      />
                      <div className='title_card_city mb-5 d-block justify-content-center'>
                        <h5>{cityItem.firstName}</h5>
                        <p>
                          {cityItem.city}
                        </p>
                        <div style={{ maxHeight: '100px' }}>
                          <div className={` p-xxl-5 collapse collapse-horizontal`}
                            id={`collapseWidthExample-${cityItem.id}`}>
                            <div className="card card-body text-black" style={{ width: '300px' }}>{cityItem.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="carousel-control-prev lateral_movements" style={{ left: '0', transform: 'translateY(-50%)' }}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next lateral_movements" style={{ right: '0', transform: 'translateY(-50%)' }}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div >
  );
};

export default Carousel;
