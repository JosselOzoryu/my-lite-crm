//Core imports
import React from "react";
import firestore from "service/firestore";

import Modal from '@material-ui/core/Modal';
import AddProductForm from 'components/AddProductForm';
import ProductCard from "components/ProductCard";
import SideBar from "components/SideBar";
import Fab from '@material-ui/core/Fab';
import { Add as AddIcon } from '@material-ui/icons';

import "./ProductsView.scss";

class ProductsView extends React.Component {
  constructor(props) {
    super(props);

    this.originalData = [];
    this.state = { data: [], modalIsOpen: false };
  }
  renderProducts = () => {
    return this.state.data.filter(product => product.active === true).map((product) => {
      return (
        <div className="products-view__products-grid__item" key={product.id}>
          <ProductCard product={product} onUpdate={this.getProducts} />
        </div>
      );
    });
  };

  filterProducts = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: this.originalData });
    } else {
      const result = this.originalData.filter(product => {
        return (
          product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.price.toString().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ data: result });
    }
  };

  orderProducts = (property, order) => {
    const products = [...this.state.data];
    products.sort((a, b) => {
      if (a[property] < b[property]) {
        if (order === "asc") {
          return -1;
        } else {
          return 1;
        }
      }
      if (a[property] > b[property]) {
        if (order === "asc") {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
    this.setState({ data: products });
  };

  clearOrder = () => {
    this.setState({ data: this.originalData });
  };

  getProducts = () => {
    firestore
      .getProducts()
      .then(products => {
        this.setState({ data: products });
        this.originalData = products;
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount = () => {
    this.getProducts();
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <React.Fragment>
        <section id="products-view">
          <div className="products-view__side-bar">
            <SideBar
              onSearch={this.filterProducts}
              title={
                <h1 className="products-view__side-bar__title">Productos</h1>
              }
            >
              <div className="products-view__side-bar__filter-and-order">
                <h2>Ordenar por:</h2>
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("name", "asc");
                  }}
                >
                  Nombre - asc
              </span>
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("name", "desc");
                  }}
                >
                  Nombre - desc
              </span>
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("price", "asc");
                  }}
                >
                  Precio - asc
              </span>
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("price", "desc");
                  }}
                >
                  Precio - desc
              </span>
                {/* <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("retailPrice", "asc");
                  }}
                >
                  Precio al público - asc
              </span>
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={() => {
                    this.orderProducts("retailPrice", "asc");
                  }}
                >
                  Precio al público - desc
              </span> */}
                <span
                  className="products-view__side-bar__filter-and-order__filter"
                  onClick={this.clearOrder}
                >
                  Limpiar orden
              </span>
              </div>
            </SideBar>
          </div>
          <div className="products-view__products-container">
            <div className="products-view__products-grid">
              {this.renderProducts()}
            </div>
          </div>
          <Fab
            className="products-view__add-product-fab"
            color="primary"
            aria-label="Add"
            onClick={this.openModal}
          >
            <AddIcon />
          </Fab>
        </section>
        <Modal
          className="products-view__add-product-modal"
          aria-labelledby="modal-agregar-producto"
          aria-describedby="Formulario para agregar producto"
          open={modalIsOpen}
          disableAutoFocus={true}
          onClose={() => { this.closeModal(); }}
        >
          <AddProductForm onClose={() => { this.closeModal(); this.getProducts(); }} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ProductsView;
