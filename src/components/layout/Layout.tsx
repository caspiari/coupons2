import { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import About from '../about/About';
import Admin from '../admin/admin';
import Coupons from '../coupons/Coupons';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Login from '../login/Login';
import Menu from '../menu/Menu';
import "./Layout.css";

export default class Layout extends Component {
  public render() {
    return (
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
              <Route path="/admin" component={Admin} exact />
              {/* <Route path="/company" component={Company} exact /> */}
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
