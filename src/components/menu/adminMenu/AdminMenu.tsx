import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../CustomMenu.css";

interface IAdminMenuProps {
  logOut: any;
}

export default class AdminMenu extends Component<IAdminMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
        <NavLink to="/admin" exact>Home</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span> | </span><br />
        <input type="button" value="Log out" onClick={this.props.logOut} />
      </div>
    );
  }
}