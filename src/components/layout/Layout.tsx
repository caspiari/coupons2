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
import RegisterUser from '../register/RegisterUser';
import Admin from '../admin/Admin';
import Company from '../company/Company';
import RegisterCompany from '../register/RegisterCompany';
import UpdateUser from '../update/updateUser/UpdateUser';
import UsersManagement from '../admin/usersManagment/UsersManagement';
import UserDetails from '../customer/userDetails/UserDetails';
import Home from '../home/Home';
import UpdateCoupon from '../coupons/updateCoupon/UpdateCoupon';

export default class Layout extends Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="layout">

          <header>
            <Header />
          </header>
          <menu>
            <Menu />
          </menu>

          <main>
            <Switch>
              <Route path="/about" component={About} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/coupons" component={Coupons} exact />
              <Route path="/admin" component={Admin} exact />
              <Route path="/customer" component={Customer} exact />
              <Route path="/company" component={Company} exact />
              <Route path="/couponDetails" component={CouponDetails} exact />
              <Route path="/updateCoupon" component={UpdateCoupon} exact />
              <Route path="/usersManagement" component={UsersManagement} exact />
              <Route path="/registerUser" component={RegisterUser} exact />
              <Route path="/registerCompany" component={RegisterCompany} exact />
              <Route path="/updateUser" component={UpdateUser} exact />
              <Route path="/userDetails" component={UserDetails} exact />
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
