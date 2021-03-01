import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../CustomMenu.css";

export default class DefaultMenu extends Component<any> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
        <NavLink to="/home" exact>Home</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
      </div>
    );
  }
}