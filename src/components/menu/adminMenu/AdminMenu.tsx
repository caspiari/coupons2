import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

interface IAdminMenuProps {
  logOut: any;
}

export default class AdminMenu extends Component<IAdminMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu"><p>
            <NavLink to="/admin" exact>&ensp;Management</NavLink>
            <span className="separator">&ensp; | &ensp;</span>
            <NavLink to="/coupons" exact>Coupons</NavLink>
            <span className="separator">&ensp; | &ensp;</span>
            <NavLink to="/home" exact><input type="button" value="Log out" onClick={this.props.logOut} /></NavLink>
      </p></div>
    );
  }
}