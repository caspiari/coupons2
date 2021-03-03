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
      <div className="customMenu">
        <NavLink to="/company" exact>Management</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span> | </span>
        <br />
        <NavLink to="/home" exact>
          <input type="button" value="Log out" onClick={this.props.logOut} />
        </NavLink>
      </div>
    );
  }
}