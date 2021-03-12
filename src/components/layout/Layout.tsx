import { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import About from '../about/About';
import Coupons from '../coupons/Coupons';
import CouponDetails from '../coupons/couponDetails/CouponDetails';
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
import UpdateCoupon from '../update/updateCoupon/UpdateCoupon';
import CreateCoupon from '../coupons/createCoupon/CreateCoupon';
import MyCoupons from '../customer/myCoupons/MyCoupons';
import CompanyDetails from '../company/companyDetails/CompanyDetails';
import UpdateCompany from '../update/updateCompany/UpdateCompany';

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
              <Redirect from="/" to="/home" exact />
              <Route path="/about" component={About} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/coupons" component={Coupons} exact />
              <Route path="/admin" component={Admin} exact />{/* //////////////Admin */}
              <Route path="/usersManagement" component={UsersManagement} exact />
              <Route path="/registerCompany" component={RegisterCompany} exact />
              <Route path="/customer" component={Customer} exact />{/* ////////Customer */}
              <Route path="/registerUser" component={RegisterUser} exact />
              <Route path="/updateUser/:id" component={UpdateUser} exact />
              <Route path="/userDetails/:id" component={UserDetails} exact />
              <Route path="/myCoupons" component={MyCoupons} exact />
              <Route path="/company" component={Company} exact /> {/* //////////Company */}
              <Route path="/companyDetails/:id" component={CompanyDetails} exact />
              <Route path="/updateCompany/:id" component={UpdateCompany} exact />
              <Route path="/couponDetails/:id" component={CouponDetails} exact />{/*/////Coupon */}
              <Route path="/createCoupon" component={CreateCoupon} exact />
              <Route path="/updateCoupon/:id" component={UpdateCoupon} exact />
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
