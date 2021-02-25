import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  coupons: Coupon[];
  nameFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  constructor(props: any) {
    super(props);
    this.state = { cards: [], coupons: [], nameFilter: "" };
  }

  public async componentDidMount() {
    try {
      const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
      this.setState({ coupons: response.data});
    } catch (err) {
      console.log(err.message);
    }
  }

  public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }

  public render() {
    return (
      <div className="Coupons">
        <br />
        Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon=> coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
          .map(coupon => <Card key = {coupon.id} {...coupon} /> )}
        </ol>}
      </div>
    );
  }
}
