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
      <div className="customMenu">
        <table>
          <tr>
            <td><NavLink to="/admin" exact>Management</NavLink></td>
            <th>&ensp; | &ensp;</th>
            <td><NavLink to="/coupons" exact>Coupons</NavLink></td>
            <th>&ensp; | &ensp;</th>
            <td><NavLink to="/home" exact><input type="button" value="Log out" onClick={this.props.logOut} /></NavLink></td>
          </tr>
        </table>
      </div>
    );
  }
}