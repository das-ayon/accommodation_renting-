import React, { useContext, useEffect, useState } from 'react';
import {Link, Navigate, useParams} from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from '../PhotosUploader';
import PlaceList from '../PlaceList';

export default function PlacesPage() {
const {action}= useParams();  
const [title, setTitle]= useState('');
const [address, setAddress]= useState('');
const [addedPhotos, setAddedPhotos] = useState([]);
const [description, setDescription]=useState('');
const [perks, setPerks] =useState([]);
const [extraInfo,setExtraInfo]= useState('');
const [checkin, setCheckin] =useState('');
const [checkout, setCheckout]= useState('');
const [maxGuests, setMaxGuests] = useState(1);
const [redirect,setRedirect]= useState('');


// async function addPhotoByLink(ev){
//     ev.preventDefault();
//     console.log('hello');
//     const {data}=await axios.post('/upload-by-link',{link:photoLink});
//     setAddedPhotos(prev =>{
//       return [...prev,data];
//     });
//     setPhotoLink('');
// }

// function deviceUploadPhoto(ev){
//     // ev.preventDefault();
//     // sahi se isko cross check kr lena
//     const files=ev.target.files;
//     const data=new FormData();
//     for(let i=0;i<files.length;i++){
//         data.append('photos',files[i]);
//     }
    
//     axios.post('/upload',data,{headers:{ "Content-Type":"multipart/form-data"}
//     }).then(response=>{
//         const {data:filenames}=response;
//         setAddedPhotos(prev =>{
//             return [...prev,...filenames];
//         });
        
//     })
      
// }

async function addNewPlace(ev){
    ev.preventDefault();
    const dataPlace ={title,address,addedPhotos,description,perks,extraInfo,checkin,checkout,maxGuests};
    const {data}=await axios.post('/places',dataPlace);
    setRedirect('/account')
}

if(redirect){
    return <Navigate to={redirect} />
}


  return (
    <div>
        
        <div className='mb-2 '>
           
       
            {action !== 'new' && (
                <div className=''>
                <div className='text-center'>   
                <Link className=' bg-primary text-white w-1/5 rounded-full p-2 inline-flex justify-center' to={'/account/places/new'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new Place
                </Link>
                </div> 
                <PlaceList/> 
                </div>
                
            )}
            {action === 'new' && (
                <form action="" onSubmit={addNewPlace}>
                    <h3 className='text-left mt-2 font-medium'>Title</h3>
                    <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='Title, Name of Apartment' />

                    <h3 className='text-left mt-2 font-medium'>Address</h3>
                    <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder='Address to this palce' />



                    <h3 className='text-left mt-4 font-medium'>Photos</h3>
                    <h6 className='text-sm text-left'>(More photos == Better)</h6>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {/* <div className='flex'>
                        <input  className='' value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} type="text" placeholder='Add photo using link...' />
                        <button onClick={addPhotoByLink} className='bg-gray-300 rounded-lg  px-4 mx-2'>Add&nbsp;Photo</button>
                    </div>
                    
                    <div className='text-left mt-1 '>
                      <div className='grid gap-2 grid-cols-3 md:grid-cols-4'> 
                      {addedPhotos.length > 0 && addedPhotos.map((link) => (
                        <div key={link} >
                            <img className='rounded-2xl object-cover' src={`http://localhost:4001/uploads/${link}`} alt={'image here'} />
                        </div>
                       ))}
                      </div> 
                      <label className='bg-gray-500 cursor-pointer px-14 py-4 mt-2 w- text-white w-1/5 rounded-lg flex'> 
                        <input type="file" multiple className='hidden' onChange={deviceUploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                        </svg> device
                      </label>
                    </div> */}




                    <h3 className='text-left mt-4 font-medium'>Description</h3>
                    <h6 className='text-sm text-left'>About the description of place in more details</h6>
                    <textarea className='border-current' value={description} onChange={ev=>setDescription(ev.target.value)}></textarea>

                    <h3 className='text-left mt-2 font-medium'>Perks</h3>
                    <h6 className='text-sm text-left'>select all the perks of your choice</h6>
                    <Perks selected={perks} onChange={setPerks}/>

                    <h3 className='text-left mt-2 font-medium'>Extra Info</h3>
                    <h6 className='text-sm text-left'>Rules & Regulation,etc...</h6>
                    <textarea className='border-current' value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}></textarea>
                    {/* -------------------------------------------------------- */}
                    <h3 className='text-left mt-2 font-medium'>Check In,Check Out & Max Guest</h3>
                    <h6 className='text-sm text-left'>add check-in and check-out,remember to have some time window to clean the room.</h6>
                    <div className='grid sm:grid-cols-3'>
                        <div className='mx-4'> 
                            <h3>Check in Time</h3>
                            <input type="text" value={checkin} onChange={ev=>setCheckin(ev.target.value)}/>
                        </div>
                        <div className='mx-4' value={checkout} onChange={ev=>setCheckout(ev.target.value)}> 
                            <h3>Check out Time</h3>
                            <input type="text" />
                        </div>
                        <div className='mx-4'> 
                            <h3>Number of Guest</h3>
                            <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}/>
                        </div>    
                    </div>
                    
                    <div className='mt-4 text-center'>
                        <button className='bg-primary px-8 rounded-full text-white'>Save</button>
                    </div>
                </form>
            )}
        </div>
        {/* -------PlacesPage-------- */}
    </div>
  )
}
