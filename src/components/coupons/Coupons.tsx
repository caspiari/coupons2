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
    const newState = { ...this.state };
    this.unsubscribeStore = store.subscribe(
      () => this.setState({ ...newState })
    );
    try {
      if (sessionStorage.getItem("userType") != UserType.COMPANY.valueOf()) {
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
        this.setState({ coupons: response.data });
      } else {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const id = +sessionStorage.getItem("companyId");
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byCompanyId", { params: { companyId: id } });
        this.setState({ coupons: response.data });
      }
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error" : errorMessage);
      }
      console.log(JSON.stringify(err));
    }
  }

  public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }

  public createNewCoupon = () => {
    this.props.history.push('/createCoupon')
  }


  public render() {
    return (
      <div className="coupons">
        <br />
        Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
        {sessionStorage.getItem("userType") != UserType.CUSTOMER.valueOf() && <input type="button" value="Create new coupon" onClick={this.createNewCoupon} />}

        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
            .map(coupon => <Card key={coupon.id} coupon={coupon} />)}
        </ol>}
      </div>
    );
  }
}
