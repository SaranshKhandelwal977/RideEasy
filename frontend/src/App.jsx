import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import Home from './pages/home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div className='bg-gray-200 '>
      <div className=' w-[375px] flex items-center justify-center bg-gray-800 text-white shadow-md mx-auto rounded-lg'>
          <Routes>
              <Route path='/' element={<Start/>}/>
              <Route path='/login' element={<UserLogin/>}/>
              <Route path='/signup' element={<UserSignup/>}/>
              <Route path='/captain-login' element={<CaptainLogin/>}/>
              <Route path='/captain-signup' element={<CaptainSignup/>}/>
              <Route path='/riding' element={<Riding/>}/>
              <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper> }/>
              <Route path='/user/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper> }/>
              <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper> }/>
              <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout/></CaptainProtectWrapper> }/>
              <Route path='/captain-riding' element={<CaptainProtectWrapper><CaptainRiding/></CaptainProtectWrapper> }/>
          </Routes>
      </div>
    </div>
  )
}

export default App