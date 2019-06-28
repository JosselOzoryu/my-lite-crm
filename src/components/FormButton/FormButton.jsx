import React from 'react'
import './FormButton.scss'

export const FormButton = ({onClick}) => {
  return (
    <fieldset className='product-registry__fieldset'>
      <button onClick={onClick} className='product-registry__button'>
        Submit
      </button>
    </fieldset>
  )
}
