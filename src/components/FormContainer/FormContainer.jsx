import React from 'react'
import './FormContainer.scss'

export const FormContainer = ({children}) => {
  return (
    <form className='product-registry__form'>
      {children}
    </form>
  )
}
