import React, { Component } from 'react'

import AddClientForm from 'components/AddClientForm';

import './AddClientView.scss';

export default class AddClientView extends Component {
  render() {
    return (
      <section id="mla-add-product-view">
        <AddClientForm />
      </section>
    )
  }
}
