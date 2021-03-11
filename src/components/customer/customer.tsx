import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { User } from '../../models/User';
import { store } from '../../redux/store';
import './Customer.css';

interface ICustomerState {
  user: User;
}

export default class Customer extends Component<any, ICustomerState> {

  constructor(props: any) {
    super(props);
    this.state = { user: new User() }
  }

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get<User>("http://localhost:8080/users/" + id);
      this.setState({ user: response.data });
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      } else {
        console.log(JSON.stringify(err))
      }
    }
  }

  private myDetails = () => {
    this.props.history.push({
      pathname: '/userDetails',
      state: {
        username: this.state.user.username,
        password: this.state.user.password,
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        userType: this.state.user.userType,
        companyId: this.state.user.companyId,
        id: this.state.user.id
      }
    });
  }


  public render() {
    return (
      <div className="customer">
        <h2>Hello {this.state.user.firstName} :)</h2>
        <br /><input type="button" value="My details" onClick={this.myDetails} />
        <br /><input type="button" value="My coupons" onClick={this.props.history.push('/myCoupons')} />
      </div>
    );
  }
}
