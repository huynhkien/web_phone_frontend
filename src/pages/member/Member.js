import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components'

const Member = () => {
  return (
    <div className='d-flex'>
        <div style={{width: "20%"}}>
          <Sidebar/>
        </div>
        <div className='mx-2' style={{width: "80%", display: "flex", justifyContent: "center"}}>
            <Outlet/>
        </div>
    </div>
  )
}

export default Member