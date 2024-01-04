import React from 'react';
import {Route, BrowserRouter, Link, Routes} from 'react-router-dom';

import {logo} from './assets';
import {waifu_green_logo} from './assets';
import {Home, CreatePost, EditImage} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={waifu_green_logo} alt="logo" className='w-10 object-contain'/>
        </Link>
        <div className='flex'>
          <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2'>
            Create
          </Link>
        
          <Link to='/edit-image' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Edit
          </Link>
        </div>
        
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path='/edit-image' element={<EditImage/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App