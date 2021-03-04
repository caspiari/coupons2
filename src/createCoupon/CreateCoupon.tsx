import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../models/Coupon';
import { UserType } from '../models/UserType';
import { store } from '../redux/store';
import Card from '../components/card/Card';
import "./CreateCoupon.css";

interface CreateCouponState {
  nameFilter: string;
}

export default class CreateCoupon extends Component<any, CreateCouponState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {  nameFilter: "" };
  }

  public async componentDidMount() {
    const newState = { ...this.state };
    this.unsubscribeStore = store.subscribe(
      () => this.setState({ ...newState })
    );
    try {
      if (sessionStorage.getItem("userType") != UserType.COMPANY.valueOf()) {
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
        this.setState({  });
      } else {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const id = +sessionStorage.getItem("companyId");
        const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byCompanyId", {params: {companyId: id}});
        this.setState({  });
      }
    } catch (err) {
      console.log(err.response.data.errorMessage);
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
      <div className="createCoupon">
        <br />
        Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
        {sessionStorage.getItem("userType") != UserType.CUSTOMER.valueOf() && <input type="button" value="Create new coupon" onClick={this.createNewCoupon} />}

      </div>
    );
  }
}
