//Core imports
import React from "react";
import firestore from "service/firestore";

import ProductCard from "components/ProductCard";
import SideBar from "components/SideBar";

import "./ProductsView.scss";

import products from "products";

class ProductsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.originalData = [];
  }
  renderProducts = () => {
    return this.state.data.map(product => {
      return (
        <div className="products-view__products-grid__item">
          <ProductCard product={product} />
        </div>
      );
    });
  };

  filterProducts = searchTerm => {
    if (searchTerm === "") {
      this.setState({ data: products });
    } else {
      const result = products.filter(products => {
        return (
          products.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          products.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          products.price.toString().includes(searchTerm.toLowerCase()) ||
          products.retailPrice.toString().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ data: result });
      console.log(result);
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
    this.setState({ data: products });
  };

  componentDidMount = () => {
    firestore
      .getProductsFromDB()
      .then(products => {
        this.setState({ data: products });
        this.originalData = products;
        console.log(products);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
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
                  this.orderProducts("productName", "asc");
                }}
              >
                Nombre - asc
              </span>
              <span
                className="products-view__side-bar__filter-and-order__filter"
                onClick={() => {
                  this.orderProducts("productName", "desc");
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
              <span
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
              </span>
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
      </section>
    );
  }
}

export default ProductsView;
