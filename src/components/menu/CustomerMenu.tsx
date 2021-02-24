import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import "./Menu.css";

export default class Menu extends Component<any, any> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);

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
      <div className="customerMenu">
        <span> | </span>
        <NavLink to="/myCoupons" exact>My coupons</NavLink>
        <span> | </span>
        <a href="#" onClick={this.logOut}>Log out</a>
      </div>
    );
  }
}
