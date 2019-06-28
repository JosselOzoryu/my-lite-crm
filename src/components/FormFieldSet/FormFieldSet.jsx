import React from 'react'
import './FormFieldSet.scss'

export const FormFieldSet = ({textLabel, inputValue, onChange}) => {
  return (
    <fieldset className='product-registry__fieldset'>
      <input
        className='product-registry__input'
        type='text'
        value={inputValue}
        onChange={onChange}
        required />
      <label className='product-registry__label' for='first'>
        {textLabel}
      </label>
      <div className='after' />
    </fieldset>
  )
}
