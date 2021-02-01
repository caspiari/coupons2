import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import About from '../about/About';
import Coupons from '../coupons/Coupons';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import "./Layout.css";

export default class Layout extends Component {
  public render() {
    return (
      // <div className="layout">
      //   <header><Header /></header>
      //   <menu><Menu /></menu>
      //   <Login><Login /></Login>
      //   <footer><Footer /></footer>
      // </div>
      <BrowserRouter>
        <div className="layout">

          <header>
            <Header />
          </header>

          <aside>
            <Menu />
          </aside>

          <main>
            <Switch>
              <Route path="/about" component={About} exact />
              <Route path="/home" component={Login} exact />
              <Route path="/coupons" component={Coupons} exact />
              <Redirect from="/" to="/home" exact />
              {/* <Route component={PageNotFound} /> */}
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>

        </div>
      </BrowserRouter>
    );
  }
}
