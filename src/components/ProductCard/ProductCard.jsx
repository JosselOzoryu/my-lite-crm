import React from "react";
import firestore from 'service/firestore';

import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { Edit as EditIcon } from "@material-ui/icons";
import { Clear as ClearIcon } from "@material-ui/icons";
import { Undo as UndoIcon } from "@material-ui/icons";
import { Save as SaveIcon } from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


import "./ProductCard.scss";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      dialogOpen: false,
      dialogContent: <React.Fragment />,
      name: '',
      vendor: '',
      price: '',
      description: '',
    }
  }

  changeToEditMode = () => {
    this.setState({ editMode: true })
  }

  closeEditMode = () => {
    this.setState({ editMode: false })
  }

  componentDidMount = () => {
    const { name, vendor, price } = this.props.product;
    this.setState({
      name,
      vendor,
      price,
    });
  }

  handleInputs = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  }

  openDialog = (content) => {
    this.setState({ dialogOpen: true, dialogContent: content });
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false, dialogContent: <React.Fragment /> });
  }

  onDeleteProduct = () => {
    this.openDialog(
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">{"Seguro que quieres eliminar el producto?"}</DialogTitle>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.updateProduct} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  onUpdateProduct = () => {
    this.openDialog(
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">{"Seguro que quieres editar el producto?"}</DialogTitle>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.updateProduct} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  deleteProduct = () => {
    firestore.deleteProduct(this.props.product.id).then(() => {
      alert("Eliminado con exito");
      this.closeDialog();
    }).catch((e) => alert(e));
  }

  updateProduct = () => {
    const { description, name, vendor, price } = this.state;
    const { id, image } = this.props.product;
    firestore.updateProduct({ description, image, name, price, vendor, id }).then(() => {
      alert("Editado con exito");
      this.closeDialog();
      this.closeEditMode();
      this.props.onUpdate();
    }).catch(e => alert(e));
  }

  render() {
    const { product } = this.props;
    const { id, name, vendor, price } = this.state;
    const { image } = product;
    return (
      <Card className="product-card">
        {/*  Foto del producto */}
        <div className="product-card__product-image">
          <span className="product-card__product-image__holder" style={{ backgroundImage: `url(${image})` }} />
          {/* <img src={image} alt="" /> */}
        </div>
        {/* Datos del producto  */}
        <div className="product-card__product-data">
          <div className="product-card__product-data__id">
            <span className="product-card__product-data__data-label">ID:</span>
            <span className="product-card__product-data__id__value">{id}</span>
          </div>
          <div className="product-card__product-data__name">
            {
              this.state.editMode ? (
                <TextField
                  className="col-sm-12 col-gl-4"
                  label="Nombre"
                  value={name}
                  name="name"
                  onChange={this.handleInputs}
                  margin="normal"
                />
              ) : (
                  <React.Fragment>
                    <span className="product-card__product-data__data-label">
                      Nombre:
                    </span>
                    <span className="product-card__product-data__name__value">
                      {name}
                    </span>
                  </React.Fragment>
                )
            }
            {
              this.state.editMode ? (
                <TextField
                  className="col-sm-12 col-gl-4"
                  label="Distribuidor"
                  value={vendor}
                  name="vendor"
                  onChange={this.handleInputs}
                  margin="normal"
                />
              ) : (
                  <React.Fragment>
                    <span className="product-card__product-data__data-label">
                      Distribuidor:
                    </span>
                    <span className="product-card__product-data__vendor__value">
                      {vendor}
                    </span>
                  </React.Fragment>
                )
            }
          </div>
          <div className="product-card__product-data__prices">
            {
              this.state.editMode ? (
                <TextField
                  className="col-sm-12 col-gl-4"
                  label="Precio"
                  value={price}
                  name="price"
                  onChange={this.handleInputs}
                  margin="normal"
                  type="number"
                />
              ) : (
                  <React.Fragment>
                    <span className="product-card__product-data__data-label">
                      Precio de compra:
                    </span>
                    <span className="product-card__product-data__prices__value">
                      ${price}
                    </span>
                  </React.Fragment>
                )
            }
          </div>
          {
            this.state.editMode ? (
              <div>
                <Fab size="small" className="product-card__fab-edit" aria-label="edit" onClick={this.closeEditMode}>
                  <UndoIcon />
                </Fab>
                <Fab className="product-card__fab-edit"
                  color="primary"
                  aria-label="edit"
                  onClick={this.onUpdateProduct}
                >
                  <SaveIcon />
                </Fab>
                <Fab size="small" className="product-card__fab-edit"
                  color="secondary"
                  aria-label="edit"
                  onClick={this.onDeleteProduct}
                >
                  <ClearIcon />
                </Fab>

              </div>
            ) : (
                <Fab size="small" className="product-card__fab-edit"
                  color="primary"
                  aria-label="edit"
                  onClick={this.changeToEditMode}
                >
                  <EditIcon />
                </Fab>
              )
          }
        </div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.state.dialogContent}
        </Dialog>
      </Card>
    );
  }
}

export default ProductCard;
