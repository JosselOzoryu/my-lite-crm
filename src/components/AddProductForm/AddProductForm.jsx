import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import './AddProductForm.scss';

export default class AddProductForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      price: 0,

    }
  }

  handleInputs = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, price } = this.state;
    return (
      <Card className="mla-add-product-form">
        <TextField
          id="standard-name"
          label="Nombre"
          value={name}
          name="name"
          onChange={this.handleInputs}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Precio"
          value={price}
          name="price"
          onChange={this.handleInputs}
          margin="normal"
          type="number"
          min="1"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        <Select
          name="Vendor"
        >
          <MenuItem value="" />
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Card>
    )
  }
}
