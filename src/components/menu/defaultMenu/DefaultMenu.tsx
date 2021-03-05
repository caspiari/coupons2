import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

export default class DefaultMenu extends Component<any> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
            <NavLink to="/home" exact>&ensp;Home</NavLink>
            &ensp; | &ensp;
            <NavLink to="/coupons" exact>Coupons</NavLink>
      </div>
    );
  }
}