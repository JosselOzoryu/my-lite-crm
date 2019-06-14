import React from 'react'
import './ProductRegistryView.scss'
import { FormFieldSet } from '../../components/FormFieldSet/FormFieldSet'

class ProductRegistryView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 0,
      productName: '',
      vendor: '',
      price: 0,
      retailPrice: 0,
      photo: ''
    }
  }

  render () {
    return (
      <form className='product-registry__form' action='#' autocomplete='off'>
        <FormFieldSet />
        <fieldset className='product-registry__fieldset'>
          <input
            className='product-registry__input'
            id='vendor'
            type='text'
            name='vendor'
            required />
          <label className='product-registry__label' for='last'>
            Proveerdor
          </label>
          <div className='after' />
        </fieldset>
        <fieldset className='product-registry__fieldset'>
          <input
            className='product-registry__input'
            id='price'
            type='text'
            name='price'
            required />
          <label className='product-registry__label' for='last'>
            Precio de compra
          </label>
          <div className='after' />
        </fieldset>
        <fieldset className='product-registry__fieldset'>
          <input
            className='product-registry__input'
            id='retailPrice'
            type='text'
            name='retailPrice'
            required />
          <label className='product-registry__label' for='last'>
            Precio de venta
          </label>
          <div className='after' />
        </fieldset>
        <fieldset className='product-registry__fieldset'>
          <button className='product-registry__button'>
            Submit
          </button>
        </fieldset>
      </form>
    )
  }
}

export default ProductRegistryView
