import axios from 'axios';
import './Customer.css';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Company } from '../../models/Company';
import { Coupon } from '../../models/Coupon';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
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

    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        {})
    );
  }

  public async componentDidMount() {
    // if (store.getState().isLoggedIn) {
      const id = sessionStorage.getItem("id");
      console.log("ID from storage: " + id);
      try {
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byUserId/" + id);
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
        Search by name: <input type="text" onChange={this.onCustomerPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase())).
            map(coupon => <Card key={coupon.id} {...coupon} />)}
        </ol>}
      </div>
    );
  }
}
