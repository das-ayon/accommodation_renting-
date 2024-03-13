import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { userContext } from '../UserContext'
import { Link,Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import PlaceList from '../PlaceList';
import Account from './Account';

export default function PlaceBrief() {
    const {id}=useParams();

    useEffect(()=>{
        // id(!id){
            
        // }
        axios.get('/placesB/'+id).then(response=>{
            const {data}= response;
        })
    },[id]);
  return (
    <div>
        {/* <Account/> */}
        PlaceBrief
        
    </div>
  )
}
