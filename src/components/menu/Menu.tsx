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
  userType: UserType;
}

export default class Menu extends Component<any, IMenuState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { userType: null };
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        { userType: store.getState().userType })
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private logOut = async () => {
    sessionStorage.clear();
    store.dispatch({ type: ActionType.LOGIN, payload: null });
    axios.defaults.headers.common["Authorization"] = "";
  }

  public render() {
    return (
      <div className="menu">
        {this.state.userType == null && <DefaultMenu />}
        {this.state.userType == UserType.CUSTOMER && <CustomerMenu logOut={this.logOut} />}
        {this.state.userType == UserType.ADMIN && <AdminMenu logOut={this.logOut} />}
        {this.state.userType == UserType.COMPANY && <CompanyMenu logOut={this.logOut} />}
        <span> | </span>
        <NavLink to="/about" exact>About</NavLink>
      </div>
    );
  }
}
