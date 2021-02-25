import axios from 'axios';
import './Customer.css';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { store } from '../../redux/store';
import Card from '../card/Card';

interface ICustomerState {
  coupons: Coupon[];
  nameFilter: string;
}

export default class Customer extends Component<any, ICustomerState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { coupons: [], nameFilter: "" };
  }

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        {})
    );
    // if (store.getState().isLoggedIn) {
      const id = +sessionStorage.getItem("id");
      const token = sessionStorage.getItem("token");
      try {
        axios.defaults.headers.common["Authorization"]= token;
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byUserId/?id=" + id);
        const newState = {...this.state};
        newState.coupons = response.data;
        this.setState(newState);
      } catch (err) {
        console.log(err.message);
      }
    // } else {
    //   alert("Please log in first");
    //   this.props.history.push('/home');
    // }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public onCustomerPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }

  public render() {
    return (
      <div className="Customer">
        <br />
        <h3>Your coupons:</h3><br/>
        Search by name: <input type="text" onChange={this.onCustomerPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
          .map(coupon => <Card key={coupon.id} {...coupon} />)}
        </ol>}
      </div>
    );
  }
}
