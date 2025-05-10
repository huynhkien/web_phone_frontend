import React from 'react';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const PagItem = ({children}) => {
  const navigate = useNavigate();
  let [params] = useSearchParams();
  const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if(Number(children)) queries.page = children;
    navigate({
        pathname: location.pathname,
        search: createSearchParams(queries).toString()
     })
  }
  return (
    <li class='li ' onClick={handlePagination} >
      <span className='page-link d-flex justify-content-center align-items-center' style={{backgroundColor: "#266bf9", width: "50px", height: "50px", borderRadius: "5px"}}>
          {children}
      </span>
    </li>
  )
}

export default PagItem