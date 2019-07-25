import React, { Component } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Drawer from "@material-ui/core/Drawer";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  BusinessCenter as Clients,
  LocalOffer as LocalOfferIcon,
  NoteAdd as NoteAddIcon,
  Build as BuildIcon
} from "@material-ui/icons/";
import IconButton from "@material-ui/core/IconButton";

import "./AppNav.scss";

export default class AppNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false
    };
  }

  openDrawer = () => {
    this.setState({ drawerIsOpen: true });
  };

  closeDrawer = () => {
    this.setState({ drawerIsOpen: false });
  };

  render() {
    const { drawerIsOpen } = this.state;
    return (
      <AppBar position="static" className="mla-app-bar">
        <ToolBar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            onClick={this.openDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Link className="mla-app-bar__home-menu" to="/">
            <TouchRipple>
              <div className="app-navbar__logo">My Lite CRM</div>
            </TouchRipple>
          </Link>

          <Drawer
            className="mla-app-bar__drawer"
            open={drawerIsOpen}
            onClose={this.closeDrawer}
          >
            <Link className="mla-app-bar__menu-item" to="/users">
              <PersonIcon />
              Usuarios
            </Link>
            <Link className="mla-app-bar__menu-item" to="/clients">
              <Clients />
              Clientes
            </Link>
            <Link className="mla-app-bar__menu-item" to="/products">
              <LocalOfferIcon />
              Productos
            </Link>
            <Link className="mla-app-bar__menu-item" to="/products/add">
              <NoteAddIcon />
              Agregar Productos
            </Link>
            <Link className="mla-app-bar__menu-item" to="/services">
              <BuildIcon />
              Services
            </Link>
            <Link className="mla-app-bar__menu-item" to="/sign-in">
              Log In
            </Link>
          </Drawer>
        </ToolBar>
      </AppBar>
    );
  }
}
