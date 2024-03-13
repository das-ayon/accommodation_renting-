import React from 'react'

export default function Perks({selected,onChange}) {
  function handleCbClick(ev){
     const {checked,name}=ev.target;
     if(checked){
        onChange([...selected,name]);
     }else{
        onChange([...selected.filter(selectedName => selectedName !== name )])
     }
  }

  return (
    <>
    <div className='text-left grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border rounded-lg px-4 p-2'>
                        <label htmlFor="">
                            <input type="checkbox" />
                            <span className='mr-2' name='wifi' onChange={handleCbClick}>wifi</span>
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" />
                            <span className='mr-2' name='parking' onChange={handleCbClick}>parking</span>
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" />
                            <span className='mr-2' name='TV' onChange={handleCbClick}>TV</span>
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" />
                            <span className='mr-2' name='pets' onChange={handleCbClick}>pets</span>
                        </label>
    </div>
    </>
  )
}
