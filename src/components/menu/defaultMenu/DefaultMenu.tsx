import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "../Menu.css";

export default class DefaultMenu extends Component<any> {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="customMenu">
        <table>
          <tr>
            <td><NavLink to="/home" exact>Home</NavLink></td>
            <th> | </th>
            <td><NavLink to="/coupons" exact>Coupons</NavLink></td>
          </tr>
        </table>
      </div>
    );
  }
}