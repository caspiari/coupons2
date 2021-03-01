import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./CustomerMenu.css";

interface ICustomerProps {
  logOut: any;
}

export default class CustomerMenu extends Component<ICustomerProps> {

  public render() {
    return (
      <div className="customerMenu">
        <span> | </span>
        <NavLink to="/customer" exact>My coupons</NavLink>
        <span> | </span>
        <br />
        <input type="button" value="Log out" onClick={this.props.logOut} />
      </div>
    );
  }
}