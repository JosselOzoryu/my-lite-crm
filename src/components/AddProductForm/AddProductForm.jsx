import React, { Component } from 'react'
import firestore from 'service/firestore';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone'

import './AddProductForm.scss';

export default class AddProductForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      price: 0,
      vendor: '',
      description: '',
      image: null,
    }
  }

  handleInputs = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFileUpload = (file) => {
    console.log(file);
    let myBlob = new Blob(file, { type: file[0].type });
    let myReader = new FileReader();
    //handler executed once reading(blob content referenced to a variable) from blob is finished. 
    myReader.addEventListener("loadend", (result) => {
      console.log(result.srcElement.result);
      this.setState({ image: result.srcElement.result })
    });
    //start the reading process.
    myReader.readAsText(myBlob);

  }

  onAddProduct = () => {
    const { description, image, name, price, vendor } = this.state;
    firestore.addProduct({ description, image, name, price, vendor });
  }

  render() {
    const { name, price, vendor, description } = this.state;
    return (
      <Card className="mla-add-product-form">
        <TextField
          className="col-sm-12 col-gl-4"
          label="Nombre"
          value={name}
          name="name"
          onChange={this.handleInputs}
          margin="normal"
        />
        <TextField
          className="col-sm-12 col-gl-4"
          label="Precio"
          value={price}
          name="price"
          onChange={this.handleInputs}
          margin="normal"
          type="number"
          min="1"
        />
        <TextField
          className="col-sm-12 col-gl-4"
          label="Marca"
          value={vendor}
          name="vendor"
          onChange={this.handleInputs}
          margin="normal"
          type="text"
        />

        <TextField
          className="col-12"
          label="Descripción"
          value={description}
          name="description"
          onChange={this.handleInputs}
          margin="normal"
          type="text"
        />

        <span className="mla-add-product-form__dropzone-title">Imagen:</span>
        <DropzoneArea
          onChange={this.handleFileUpload}
          acceptedFiles={["image/*"]}
          filesLimit={1}
          maxFileSize={10000000}
          dropzoneClass="mla-add-product-form__dropzone"
          showPreviews={true}
          dropzoneText=""
          showPreviewsInDropzone={false}
        />

        <Button variant="contained" color="primary" onClick={this.onAddProduct}>
          Registrar
          </Button>
      </Card>
    )
  }
}
