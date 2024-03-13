// PlaceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlaceList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/placelist').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      {places.length > 0 && places.map((place) => (
          <Link to={'/account/places/brief/'+place._id} key={place.id} className='bg-gray-300 mx-4 rounded-lg px-4 py-1 my-1 flex cursor-pointer'>
            <div className='w-32 h-32 bg-red-100 rounded-lg m-1  shrink-0'> 
                 {/* upper div m grow class tha    */}
                {place.addedPhotos.length >0 && (
                    <img src={place.addedPhotos[0]} alt="" />
                )}
            </div>
            <div className='grow-0 shrink'>
                <h2 className='font-bold text-xl'>{place.title} </h2>
                <p>{place.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
