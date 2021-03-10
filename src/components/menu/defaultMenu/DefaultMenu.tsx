import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

export default class DefaultMenu extends Component<any> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <span className="customMenu">
        <NavLink to="/home" exact>&ensp;Home</NavLink>
        <span className="separator">&ensp; | &ensp;</span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span className="separator">&ensp; | &ensp;</span>
        <NavLink to={"/login"}>Login</NavLink>
      </span>
    );
  }
}