import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import { userAuthStore } from './store/userauthstore.js'
import LoginPage from './pages/LoginPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import LoggedinHomePage from './pages/LoggedinHomePage.jsx'

const App = () => {
  const {isAuthenticated} = userAuthStore();
  return (
    <>
      <Routes>
        <Route path = "*" element = {<LandingPage/>}/>
        <Route path = "/" element = {!isAuthenticated ? <LandingPage/> : <Navigate to = {"/user"}/>}/>
        <Route path = "/user" element={isAuthenticated ? <LoggedinHomePage/> : <Navigate to = {"/"}/>}/>
        <Route path = "/login" element={!isAuthenticated ? <LoginPage/> : <Navigate to = {"/user"}/> } />
        <Route path = "signin" element = {!isAuthenticated ? <SignInPage/> : <Navigate to = {"/user"}/>} />
      </Routes>
    </>
  )
}

export default App
