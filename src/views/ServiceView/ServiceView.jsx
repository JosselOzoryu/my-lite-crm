//Core imports
import React from "react";
import firestore from "service/firestore";

import Card from "@material-ui/core/Card";

//Components imports
import ServiceCard from "components/SeviceCard";
import SideBar from "components/SideBar";

//Style imports
import "./ServiceView.scss";

class ServiceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.originalData = [];
  }
  renderServices = () => {
    return this.state.data.map(user => {
      return (
        <div className="services-view__services-grid__item" key={service.id}>
          <ServiceCard user={service} />
        </div>
      );
    });
  };
}
