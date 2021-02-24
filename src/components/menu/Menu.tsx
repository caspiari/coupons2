import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import CustomerMenu from './CustomerMenu';
import "./Menu.css";

export default class Menu extends Component {

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

    public render() {
        return (
            <div className="menu">
                <NavLink to="/home" exact>Home</NavLink>
                <span> | </span>
                <NavLink to="/coupons" exact>Coupons</NavLink>
                {store.getState().isLoggedIn && (sessionStorage.getItem("userType") === "CUSTOMER") && <CustomerMenu /> }
                <span> | </span>
                <NavLink to="/about" exact>About</NavLink>
            </div>
        );
    }
}
