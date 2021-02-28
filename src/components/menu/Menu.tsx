import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import CustomerMenu from './customerMenu/CustomerMenu';
import "./Menu.css";

interface IMenuState {
  isLoggedIn: boolean;
}

export default class Menu extends Component<any, IMenuState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = { isLoggedIn: false }
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        { isLoggedIn: store.getState().isLoggedIn })
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
        <NavLink to="/home" exact>Home</NavLink>
        <span> | </span>
        <NavLink to="/coupons" exact>Coupons</NavLink>
        <div className="customerMenu">
          {store.getState().isLoggedIn && <CustomerMenu logOut={this.logOut} />}
        </div>
        <span> | </span>
        <NavLink to="/about" exact>About</NavLink>
      </div>
    );
  }
}
