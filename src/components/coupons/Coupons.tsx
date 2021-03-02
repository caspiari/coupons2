import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { UserType } from '../../models/UserType';
import { store } from '../../redux/store';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  coupons: Coupon[];
  nameFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { cards: [], coupons: [], nameFilter: "" };
  }

  public async componentDidMount() {
    const newState = {...this.state};
    this.unsubscribeStore = store.subscribe(
      () => this.setState({ ...newState })
    );
    
    try {
      if(sessionStorage.getItem("userType") != UserType.COMPANY.valueOf()) {
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
        this.setState({ coupons: response.data });
      } else {
        const id = +sessionStorage.getItem("companyId");
        console.log(id);
        axios.defaults.params["companyId"] = id;
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byCompanyId");
        this.setState({ coupons: response.data });
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }


  public render() {
    return (
      <div className="coupons">
        <br />
        Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
            .map(coupon => <Card key={coupon.id} coupon={coupon} />)}
        </ol>}
      </div>
    );
  }
}
