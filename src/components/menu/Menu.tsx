import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./Menu.css";

export default class Menu extends Component {
    public render() {
        return (
             <div className="menu">
             <NavLink to="/home" exact>Home</NavLink>
             <span> | </span>
             <NavLink to="/coupons" exact>Coupons</NavLink>
             <span> | </span>
             <NavLink to="/about" exact>About</NavLink>
         </div>
        );
    }
  }
