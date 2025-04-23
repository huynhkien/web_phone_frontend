import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../../components'
const Public = () => {
  return (
    <>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default Public