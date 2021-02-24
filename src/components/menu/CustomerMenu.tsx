import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./Menu.css";

interface ICustomerMenuState {

}

export default class CustomerMenu extends Component<any, ICustomerMenuState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {}

    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        {})
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private logOut = () => {
    this.props.history.push("/home");
    sessionStorage.clear();
    store.dispatch({ type: ActionType.Login, payload: false });
    axios.defaults.headers.common["Authorization"] = "";
  }

  public render() {
    return (
      <div className="menu">
        <span> | </span>
        <NavLink to="/customer" exact>My coupons</NavLink>
        <span> | </span>
        <a href="#" onClick={this.logOut}>Log out</a>
      </div>
    );
  }
}