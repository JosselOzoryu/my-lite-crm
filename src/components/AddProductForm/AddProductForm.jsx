//Core imports
import React, { Component } from "react";
import firestore from "service/firestore";

//Material UI imports
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DropzoneArea } from "material-ui-dropzone";
import Snackbar from "@material-ui/core/Snackbar";

//Style imports
import "./AddProductForm.scss";

export default class AddProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: 0,
      vendor: "",
      description: "",
      image: null,
      snackBar: {
        open: false,
        variant: "",
        message: ""
      }
    };
  }

  openSnackBar = (variant, message) => {
    this.setState({
      snackBar: {
        open: true,
        variant,
        message
      }
    });
  };

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        open: false,
        variant: "",
        message: ""
      }
    });
  };

  handleInputs = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileUpload = file => {
    this.setState({ image: file[0] });
    console.log(file[0]);
  };

  onAddProduct = () => {
    const { description, image, name, price, vendor } = this.state;
    firestore.uploadImage(image).then(imageUrl => {
      firestore
        .addProduct({ description, image: imageUrl, name, price, vendor })
        .then(response => {
          this.props.onClose();
          this.openSnackBar("success", "Producto agregado con éxito");
        })
        .catch(error => {
          this.openSnackBar("error", error.toString());
        });
    });
  };

  render() {
    const { name, price, vendor, description, snackbarIsOpen } = this.state;
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
        <Snackbar
          open={snackbarIsOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}
        />
      </Card>
    );
  }
}
