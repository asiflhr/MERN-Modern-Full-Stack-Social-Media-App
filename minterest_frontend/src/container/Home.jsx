import React, {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'

import {Sidebar, UserProfile} from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'


const Home = () => {

  const [toggleSiebar, setToggleSiebar] = useState(false)
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  // useEffect(() => {
  //   const query = userQuery(userInfo?.googleId);

  //   client.fetch(query).then((data) => {
  //     setUser(data[0]);
  //   });
  // }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>

      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSiebar(false)} />
        <Link to='/'>
        <img src={logo} alt='logo' className='w-32' />
      </Link>
      <Link to={`user-profile/${user?._id}`}>
        <img src={''} alt='profile' className='w-32' />
      </Link>
      </div>
    </div>
  )
}

export default Home