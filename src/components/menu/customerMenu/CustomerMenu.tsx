import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../CustomMenu.css";

interface ICustomerMenuProps {
  logOut: any;
}

export default class CustomerMenu extends Component<ICustomerMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
        <NavLink to="/customer" exact>Home</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span> | </span>
        <NavLink to="/customer" exact>My coupons</NavLink>
        <span> | </span>
        <br />
        <input type="button" value="Log out" onClick={this.props.logOut} />
      </div>
    );
  }
}