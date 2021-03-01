import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import AdminMenu from './adminMenu/AdminMenu';
import CompanyMenu from './companyMenu/CompanyMenu';
import CustomerMenu from './customerMenu/CustomerMenu';
import DefaultMenu from './defaultMenu/DefaultMenu';
import "./Menu.css";

interface IMenuState {
  // isLoggedIn: boolean;
  userType: string;
}

export default class Menu extends Component<any, IMenuState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    console.log("Menu props: " + this.props.history);
    this.state = { userType: sessionStorage.getItem("userType") }
  }
  // isLoggedIn: false, 
  // componentDidMount() {
  //   this.unsubscribeStore = store.subscribe(
  //     () => this.setState(
  //       { isLoggedIn: store.getState().isLoggedIn })
  //   );
  // }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private logOut = async () => {
    this.props.history.push('/home')
    sessionStorage.clear();
    store.dispatch({ type: ActionType.Login, payload: false });
    axios.defaults.headers.common["Authorization"] = "";
  }

  public render() {
    return (
      <div className="menu">
        {(this.state.userType === "") && <DefaultMenu logOut={this.logOut} />}
        {(this.state.userType === "CUSTOMER") && <CustomerMenu logOut={this.logOut} />}
        {(this.state.userType === "ADMIN") && <AdminMenu logOut={this.logOut} />}
        {(this.state.userType === "COMPANY") && <CompanyMenu logOut={this.logOut} />}
        <span> | </span>
        <NavLink to="/about" exact>About</NavLink>
      </div>
    );
  }
}
