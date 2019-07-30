import React from "react";

import Card from '@material-ui/core/Card';

import "./ProductCard.scss";

function ProductCard(props) {
  const { product } = props;
  const { image, id, name, vendor, price } = product;
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
          <span className="product-card__product-data__data-label">
            Nombre:
          </span>
          <span className="product-card__product-data__name__value">
            {name}
          </span>
          <span className="product-card__product-data__data-label">
            Distribuidor:
          </span>
          <span className="product-card__product-data__vendor__value">
            {vendor}
          </span>
        </div>
        <div className="product-card__product-data__prices">
          <span className="product-card__product-data__data-label">
            Precio de compra:
          </span>
          <span className="product-card__product-data__prices__value">
            ${price}
          </span>
          {/* <span className="product-card__product-data__data-label">
            Precio al público:
          </span>
          <span className="product-card__product-data__prices__value">
            ${retailPrice}
          </span> */}
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
