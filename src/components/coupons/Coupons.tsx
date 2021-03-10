import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { UserType } from '../../models/enums/UserType';
import { store } from '../../redux/store';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  coupons: Coupon[];
  nameFilter: string;
  companyFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { cards: [], coupons: [], nameFilter: "", companyFilter: "" };
  }

  public async componentDidMount() {
    const newState = { ...this.state };
    this.unsubscribeStore = store.subscribe(
      () => this.setState({ ...newState })
    );
    try {
      if (sessionStorage.getItem("userType") !== UserType.COMPANY.valueOf()) {
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
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      }
      console.log(JSON.stringify(err));
    }
  }

  public onNamePipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }

  public onCompanyPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ companyFilter: text });
  }

  public createNewCoupon = () => {
    this.props.history.push('/createCoupon')
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="coupons">
        <br />
        Search by name: <input type="text" onChange={this.onNamePipeChanged} /> &nbsp;&nbsp;
        {sessionStorage.getItem("userType") !== "COMPANY" && <span> Search by company: <input type="text" onChange={this.onCompanyPipeChanged} /> </span>}
        <br />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
          .filter(coupon => coupon.companyName.toLowerCase().includes(this.state.companyFilter)).map(coupon => <Card key={coupon.id} coupon={coupon} />)}
        </ol>}
      </div>
    );
  }
}
