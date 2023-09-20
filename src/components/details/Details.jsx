import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Url= 'https://mytineraty-back-brazon84.vercel.app/cities';

function Details() {
    const [cityData, setCityData] = useState({});
    const [itineratyData, setItineratyData] = useState([]);
    const { _id, itineratyID, activityID } = useParams();


    useEffect(() => {

        const fetchData = async () => {
            try {
                const cityResponse = await axios.get(`${Url}/${_id}`);
                setCityData(cityResponse.data);

                const itinerariesResponse = await axios.get(`${Url}/${_id}/${itineratyID}`);
                setItineratyData(itinerariesResponse.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [_id, itineratyID, activityID, Url]);


    return (
        <div className='p-5 card_detail'>

            <div className='d-flex justify-content-center'>
                <div className="card p-4 bg-dark-subtle" style={{ width: '50rem' }}>
                    <img src={cityData.url} className="card-img-top rounded border border-primary border-4" alt={`${cityData.city}, ${cityData.country}`} />
                    <div className="card-body justify-content-center d-block text-center">

                        <h5 className="card-title">
                            {cityData.city}.
                        </h5>
                        <p>
                            {cityData.description}.
                        </p>
                    </div>
                </div>
            </div>
            <div className='button_prev d-flex justify-content-center align-content-center text-center mt-4'>
                <Link to={'/cities'} style={{ textDecoration: 'none' }}>
                    <button className='p-2 fs-3 fw-bold text-decoration-none d-flex align-content-center justify-content-center border-0 rounded gap-2 bg-primary text-white' >
                        <div>
                            <i className=' mt-2 fs-2 d-flex justify-content-center align-content-center fw-bold bx bx-skip-previous'></i>
                        </div>
                        <div>
                            prev
                        </div>
                    </button>
                </Link>
            </div>

            {itineratyData.length > 0 && (
                <div className='card d-flex justify-content-center mt-xxl-5 mb-xxl-5 bg-dark-subtle p-5 flex-wrap '>
                    <h5 className='d-flex justify-content-center mt-5 mb-5 fs-1 fw-bold'>ITINERATY</h5>


                    {itineratyData.map((itineraty) => (
                        <section key={itineraty._id} className='border border-primary border-3 rounded-4 p-4 flex-wrap mb-xxl-5 bg-secondary'>
                            <div className='d-flex justify-content-around flex-wrap'>
                                {itineraty.images.map((image, index) => (
                                    <div key={index} className='d-flex justify-content-around'>
                                        <img className='border border-primary border-5 rounded-5' style={{ width: "400px", height: "250px" }} src={image} alt={image} />
                                    </div>
                                ))}
                            </div>


                            <section className='d-flex justify-content-between mt-5 p-5 mb-5 rounded-5 border border-primary border-5  align-items-center flex-wrap gap-3'>

                                <div className='d-flex  flex-column' style={{ width: "25%" }}>
                                    <h4 className=''>Price: {itineraty.price}<i className=' ms-1 bx bx-dollar bx-flashing'></i></h4>
                                    <h4 className=''>Duration: {itineraty.duration}<i className='ms-1 bx bx-time-five bx-spin'></i>Hours</h4>
                                </div>
                                <div className='d-flex flex-column justify-content-center  align-center'>
                                    <div style={{ width: "25%" }}>
                                        <img className='rounded-circle border border-primary border-4' src={itineraty.photoUser} alt={itineraty.userName} />
                                    </div>
                                    <div>
                                        <h3>{itineraty.userName}</h3>
                                    </div>
                                </div>
                                <div className='d-flex flex-column'>
                                    <div>
                                        <h4>{itineraty.likes}<i className='bx bxs-heart fs-1'></i></h4>
                                    </div>
                                    <div className='d-flex gap-2'>
                                        {itineraty.hashtag.map((hashtag, index) => (
                                            <div key={index} >
                                                <i className="bx bx-hash"></i>
                                                <span>{hashtag}</span> 
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                                <div className='d-flex justify-content-center mb-5 mt-1'>
                                    <button className='view'><Link style={{textDecoration: 'none'}} to='/activity'>View More</Link></button>
                                    
                                </div>
                               
                        </section>
                    ))}

                </div>
            )};
        </div>
    )
}


export default Details;