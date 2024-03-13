import React, { useState } from 'react'
import axios from 'axios';

export default function PhotosUploader({addedPhotos,onChange}) {

    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        console.log('hello');
        const {data}=await axios.post('/upload-by-link',{link:photoLink});
        onChange(prev =>{
          return [...prev,data];
        });
        setPhotoLink('');
    }
    
    function deviceUploadPhoto(ev){
        // ev.preventDefault();
        // sahi se isko cross check kr lena
        const files=ev.target.files;
        const data=new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        
        axios.post('/upload',data,{headers:{ "Content-Type":"multipart/form-data"}
        }).then(response=>{
            const {data:filenames}=response;
            onchange(prev =>{
                return [...prev,...filenames];
            });
            
        })
          
    }
  

  return (
    <>
                       <div className='flex'>
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
                        </div>
    </>
  )
}
