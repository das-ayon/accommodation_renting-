import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import {UserContextProvider} from './UserContext'
import Account from './pages/Account'
import PlaceBrief from './pages/PlaceBrief'

axios.defaults.baseURL= 'http://localhost:4001';
axios.defaults.withCredentials= true;

function App() {
 
 

  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/account/:subpage?' element={<Account/>}></Route>
        <Route path='/account/:subpage/:action' element={<Account/>}></Route>
        <Route path='/account/places/brief/:id' element={<PlaceBrief/>}></Route>
        {/* <Route path='/account/bookings' element={<Account/>}></Route>
        <Route path='/account/places' element={<Account/>}></Route> */}
      </Route>
    </Routes>
     </UserContextProvider>
    </>
  )
}

export default App
