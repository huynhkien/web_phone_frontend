import React, {memo} from 'react'
const Button = ({name, handleOnClick}) => {
  return (
        <button
            type='button'
            className="btn bg-primary"
            onClick={() => { handleOnClick && handleOnClick() }}
        >
        
            <span>{name}</span>
            
        </button>
  )
}

export default memo(Button)