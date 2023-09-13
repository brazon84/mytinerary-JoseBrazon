import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCitiesThunk } from '../../store/slices/cities.slice.js';

function Cities() {
  // Accede al estado de las ciudades desde Redux
  const cityData = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // despacha la action

  useEffect(() => {
    dispatch(getAllCitiesThunk())
  }, [dispatch]);


  const handleSearch = () => {
    const searchTerm = searchInput.trim().toLowerCase();

    if (searchTerm === '') {
      setFilteredData([]);
      return;
    }

    const filteredCities = cityData.filter(item => {
      const cityLower = item.city.toLowerCase();
      return cityLower.indexOf(searchTerm) === 0;
    });

    setFilteredData(filteredCities);
    if (filteredCities.length === 0 && searchTerm !== '') {
      // si no encuentra la ciudad dispara el alert y limpia la consola con setSearchInput
      Swal.fire({
        icon: 'warning',
        title: 'City Not Found',
        text: 'Sorry the City requested is not available!',
        background: '#f04c4c',
        color: 'white',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
      setSearchInput('')
    }
  };


  const handleInputChange = e => {
    setSearchInput(e.target.value);
    handleSearch();
    if (e.target.value === '') {
      setFilteredData([]);
    }

  };

  const displayData = filteredData.length > 0 ? filteredData : cityData;

  return (
    <div>
      <section className='d-flex justify-content-center'>
        <div className="search d-flex justify-content-center">
          <input
            className="form-control me-2 focus-ring focus-ring-info py-1 px-2"
            type="search"
            placeholder="Search city or country..."
            value={searchInput}
            onChange={handleInputChange}

          />
        </div>
      </section>
      <section className='d-flex gap-5 flex-wrap p-5 justify-content-center card_cities'>
        {
          displayData.map(item => (
            <div key={item._id} className="card p-4 bg-dark-subtle" style={{ width: '30rem' }}>
              <Link to={`/details/${item._id}/${item.itineratyID.map(itinerary => itinerary._id).join(',')}`}>
                <img src={item.url} className="card-img-top image_city rounded border border-primary border-3 " alt={`${item.city}, ${item.country}`} />
              </Link>

              <div className="card-body d-block text-center">
                <h5 className="card-title">{item.city}.</h5>
              </div>
            </div>)
          )}
      </section>
    </div>
  );
}

export default Cities;
