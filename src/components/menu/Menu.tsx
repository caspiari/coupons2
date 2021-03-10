import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { UserType } from '../../models/enums/UserType';
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

  private logOut = async () => {
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/users/logout");
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      } else { console.log(JSON.stringify(err)) }
    }
    sessionStorage.clear();
    store.dispatch({ type: ActionType.LOGIN, payload: null });
    axios.defaults.headers.common["Authorization"] = "";
  }

  public render() {
    return (
      <div className="menu"> {/* I used components because it was too dirty and complicated otherwise */}
        <span>
        {sessionStorage.getItem("userType") == null && <DefaultMenu />}
        {sessionStorage.getItem("userType") === UserType.CUSTOMER.valueOf() && <CustomerMenu logOut={this.logOut} />}
        {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <AdminMenu logOut={this.logOut} />}
        {sessionStorage.getItem("userType") === UserType.COMPANY.valueOf() && <CompanyMenu logOut={this.logOut} />}
        &ensp;|&ensp;
        <NavLink to="/about" exact>About</NavLink>
        </span>
      </div>
    );
  }
}
