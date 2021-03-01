import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../CustomMenu.css";

interface IDefaultMenuProps {
  logOut: any;
}

export default class DefaultMenu extends Component<IDefaultMenuProps> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
        <NavLink to="/home" exact>Home</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <span> | </span>
      </div>
    );
  }
}