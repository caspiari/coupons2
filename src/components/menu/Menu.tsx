import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import CustomerMenu from './customerMenu/CustomerMenu';
import "./Menu.css";

interface IMenuState {
  isLoggedInCustomer: boolean;
}

export default class Menu extends Component<any, IMenuState> {

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
      super(props);
      console.log(this.props);
      this.state = { isLoggedInCustomer : false }
    }

    componentDidMount() {
      console.log("did mount props: " + JSON.stringify(this.props));

      this.unsubscribeStore = store.subscribe(
        () => this.setState(
          { isLoggedInCustomer : store.getState().isLoggedIn })
      );
    }
  
    componentWillUnmount() {
      this.unsubscribeStore();
    }

    private logOut = () => {
      console.log("proppssssss" + this.props);
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
                {store.getState().isLoggedIn && <CustomerMenu logOut={this.logOut} /> }
                <span> | </span>
                <NavLink to="/about" exact>About</NavLink>
            </div>
        );
    }
}
