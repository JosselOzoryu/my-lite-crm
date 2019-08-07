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
  // changeToEditMode = () => {
  //   this.setState({ editMode: !this.state.editMode });
  // };

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

//   <Card className="service-card">
//   <div className="service-card__row">
//     <div className="service-card__detail-row space-between">
//       <div className="service-card__detail-container">
//         {this.state.editMode ? (
//           <React.Fragment>
//             <TextField
//               className=""
//               label="Nombre"
//               value={name}
//               name="name"
//               onChange={this.handleInputs}
//               margin="normal"
//             />
//             <TextField
//               className=""
//               label="Apellidos"
//               value={last_name}
//               name="last_Name"
//               onChange={this.handleInputs}
//               margin="normal"
//             />
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <span className="service-card__detail-container--label">
//               Nombre:{" "}
//             </span>
//             <span>{`${name}`}</span>
//           </React.Fragment>
//         )}
//       </div>
//     </div>
//   </div>
//   {this.state.editMode ? (
//     <div>
//       <Fab aria-label="edit" onClick={this.changeToEditMode}>
//         <UndoIcon />
//       </Fab>
//       <Fab
//         color="primary"
//         aria-label="edit"
//         onClick={this.changeToEditMode}
//       >
//         <SaveIcon />
//       </Fab>
//       <Fab
//         color="secondary"
//         aria-label="edit"
//         onClick={this.changeToEditMode}
//       >
//         <ClearIcon />
//       </Fab>
//     </div>
//   ) : (
//     <Fab
//       color="primary"
//       aria-label="edit"
//       onClick={this.changeToEditMode}
//     >
//       <EditIcon />
//     </Fab>

//     <div className="service-card">
//       <div className="service-card__row">
//         <div className="service-card__detail-row space-between">
//           <div className="service-card__detail-container">
//             {this.state.editMode ? (
//               <React.Fragment>
//                 <TextField
//                   className=""
//                   label="Nombre"
//                   value={name}
//                   name="name"
//                   onChange={this.handleInputs}
//                   margin="normal"
//                 />
//                 <TextField
//                   className=""
//                   label="Apellidos"
//                   value={last_name}
//                   name="last_Name"
//                   onChange={this.handleInputs}
//                   margin="normal"
//                 />
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 <span className="service-card__detail-container--label">
//                   Nombre:{" "}
//                 </span>
//                 <span>{`${name}`}</span>
//               </React.Fragment>
//             )}
//           </div>
//           <div className="service-card__detail-container">
//             {this.state.editMode ? (
//               <React.Fragment>
//                 HOLA
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 HOLA2
//               </React.Fragment>
//             )}
//           </div>
//         </div>
//         </div>
//       </div>
//       {this.state.editMode ? (
//         <div>
//           <Fab aria-label="edit" onClick={this.changeToEditMode}>
//             <UndoIcon />
//           </Fab>
//           <Fab
//             color="primary"
//             aria-label="edit"
//             onClick={this.changeToEditMode}
//           >
//             <SaveIcon />
//           </Fab>
//           <Fab
//             color="secondary"
//             aria-label="edit"
//             onClick={this.changeToEditMode}
//           >
//             <ClearIcon />
//           </Fab>
//         </div>
//       ) : (
//         <Fab
//           color="primary"
//           aria-label="edit"
//           onClick={this.changeToEditMode}
//         >
//           <EditIcon />
//         </Fab>
//       )}
//     </Card>
//   )
// };

// function MediaCard(props) {
//   const { service } = props;
//   const { name, price, description } = service;
//   return (
//     <Card className="service-card">
//       <CardActionArea>
//         <CardMedia
//           src="https://www.aashe.org/wp-ontent/uploads/2018/02/Placeholder-Banner.png"
//           title={name}
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

ServiceCard.defaultProps = {
  service: {
    name: "holi",
    price: 6969,
    description: "aaaaay lmao"
  }
};

export default ServiceCard;
