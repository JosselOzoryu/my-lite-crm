//Core imports
import React from "react";

//Style imports
import "./ServiceCard.scss";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function ServiceCard(props) {
  const { service } = props;
  const { id, name, price, description } = service;
  return (
    <Card className="service-card">
      <div className="service-card__service-data">
        <div className="service-card__service-data__id">
          <span className="service-card__service-data__data-label">ID:</span>
          <span className="service-card__service-data__id__value">{id}</span>
        </div>
        <span className="service-card__service-data__name">
          <span className="service-card__service-data__data-label">
            Nombre:
          </span>
          <span className="service-card__service-data__name__value">
            {name}
            description
          </span>
          <div className="service-card__service-data__price">
            <span className="service-card__service-data__data-label">
              Precio por el servicio:
            </span>
            <span className="service-card__service-data__price__value">
              ${price}
            </span>
            <span className="service-card__service-data__price__value">
              ${description}
            </span>
          </div>
        </span>
      </div>
    </Card>
  );
}

function MediaCard(props) {
  const { service } = props;
  const { name, price, description } = service;
  return (
    <Card className="service-card">
      <CardActionArea>
        <CardMedia
          src="https://www.aashe.org/wp-ontent/uploads/2018/02/Placeholder-Banner.png"
          title={name}
       description <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

ServiceCard.defaultProps = {
  service: {
    name: "holi",
    price: 6969,
    description: "aaaaay lmao"
  }
};

export default ServiceCard;
