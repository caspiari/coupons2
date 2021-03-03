import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { UserType } from '../../models/UserType';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import AdminMenu from './adminMenu/AdminMenu';
import CompanyMenu from './companyMenu/CompanyMenu';
import CustomerMenu from './customerMenu/CustomerMenu';
import DefaultMenu from './defaultMenu/DefaultMenu';
import "./Menu.css";

interface IMenuState {
}

export default class Menu extends Component<any, IMenuState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState({})
    );
  }

  private logOut = () => {
    sessionStorage.clear();
    store.dispatch({ type: ActionType.LOGIN, payload: null });
    axios.defaults.headers.common["Authorization"] = "";
  }

  public render() {
    return (
      <div className="menu">
        <table>
          <tr>
            <td>{sessionStorage.getItem("userType") == null && <DefaultMenu />}</td>
            <td>{sessionStorage.getItem("userType") == UserType.CUSTOMER.valueOf() && <CustomerMenu logOut={this.logOut} />}</td>
            <td>{sessionStorage.getItem("userType") == UserType.ADMIN.valueOf() && <AdminMenu logOut={this.logOut} />}</td>
            <td>{sessionStorage.getItem("userType") == UserType.COMPANY.valueOf() && <CompanyMenu logOut={this.logOut} />}</td>
            <td className="separator">|&ensp;</td>
            <td><NavLink to="/about" exact>About</NavLink></td>
          </tr>
        </table>
      </div>
    );
  }
}
