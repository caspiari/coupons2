import { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import About from '../about/About';
import Coupons from '../coupons/Coupons';
import CouponDetails from '../couponDetails/CouponDetails';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import "./Layout.css";
import Customer from '../customer/Customer';
import Register from '../register/Register';
import Admin from '../admin/Admin';
import Company from '../company/Company';
import RegisterCompany from '../register/registerCompany/RegisterCompany';

export default class Layout extends Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="layout">

          <header>
            <Header />
          </header>

          <Menu />

          <main>
            <Switch>
              <Route path="/about" component={About} exact />
              <Route path="/home" component={Login} exact />
              <Route path="/coupons" component={Coupons} exact />
              <Route path="/admin" component={Admin} exact />
              <Route path="/customer" component={Customer} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/company" component={Company} exact />
              <Route path="/couponDetails/:id" component={CouponDetails} exact />   
              <Route path="/registerCompany" component={RegisterCompany} exact />   
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
