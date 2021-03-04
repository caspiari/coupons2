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
      <div className="customMenu">
        <NavLink to="/customer" exact>My coupons</NavLink>
        <span className="separator">&ensp; | &ensp;</span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span className="separator">&ensp; | &ensp;</span>
        <NavLink to="/home" exact>
          <input type="button" value="Log out" onClick={this.props.logOut} />
        </NavLink>
      </div>
    );
  }
}