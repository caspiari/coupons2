import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

interface ICustomerMenuProps {
  logOut: any;
}

export default class CustomerMenu extends Component<ICustomerMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <span className="menu">
        <NavLink to="/customer" exact>&ensp;Home</NavLink>
        &ensp; | &ensp;
        <NavLink to="/coupons" exact>Coupons</NavLink>
        &ensp; | &ensp;
        <NavLink to="/home" exact><input type="button" value="Log out" onClick={this.props.logOut} /></NavLink>
      </span>
    );
  }
}