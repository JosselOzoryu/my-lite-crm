import React, { Component } from 'react'

import AddProductForm from 'components/AddProductForm';

import './AddProductView.scss';

export default class AddProductView extends Component {
  render() {
    return (
      <section id="mla-add-product-view">
        <AddProductForm />
      </section>
    )
  }
}
