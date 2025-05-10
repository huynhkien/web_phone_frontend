import React from 'react'
import usePagination from '../../../hook/usePagination'
import PagItem from './PagItem';
const Pagination = ({totalCount}) => {
  const pagination = usePagination(totalCount, 1);
  return (
    <div className='pro-pagination-style text-center text-lg-end'>
      <div class='pages'>
        <ul>
          {pagination?.map(el => (
              <PagItem key={el}>
                  {el}
              </PagItem>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Pagination