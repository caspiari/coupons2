import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

interface ICompanyMenuProps {
  logOut: any;
}

export default class CompanyMenu extends Component<ICompanyMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <span className="menu">
        <NavLink to="/company" exact>&ensp;Home</NavLink>
        &ensp; | &ensp;
        <NavLink to="/coupons" exact>Coupons</NavLink>
        &ensp; | &ensp;
        <NavLink to="/home" exact><input type="button" value="Log out" onClick={this.props.logOut} /></NavLink>
      </span>
    );
  }
}