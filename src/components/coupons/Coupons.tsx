import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import { CouponType } from '../../models/enums/CouponType';
import { UserType } from '../../models/enums/UserType';
import Card from '../card/Card';
import Home from '../home/Home';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  coupons: Coupon[];
  nameFilter: string;
  companyFilter: string;
  categoryFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];

  constructor(props: any) {
    super(props);
    this.state = { cards: [], coupons: [], nameFilter: "", companyFilter: "", categoryFilter: "" };
  }

  public async componentDidMount() {
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
      Home.exceptionTreatment(err, this.props);
    }
  }

  public onNamePipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nameFilter = event.target.value;
    this.setState({ nameFilter });
  }

  public onCompanyPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let companyFilter = event.target.value;
    this.setState({ companyFilter });
  }

  public onCategoryPipeChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let categoryFilter = event.target.value;
    this.setState({ categoryFilter });
  }

  private onCardClick = (id: number) => {
    this.props.history.push('/couponDetails/' + id);
  }

  private onBackClick = () => {
    this.props.history.goBack();
  }

  public render() {
    return (
      <div className="coupons">
        <br />
        <h1><b>{sessionStorage.getItem("userType") === "COMPANY" ? "Your" : "Our"} Coupons</b></h1>
        <b>Search:</b>By name: <input type="text" id="name" onChange={this.onNamePipeChanged} />
        {sessionStorage.getItem("userType") !== "COMPANY" && <span> <label htmlFor="company">By company: </label> 
        <input type="text" id="company" onChange={this.onCompanyPipeChanged} /> </span>}
        <label htmlFor="category">By category: </label>
                <select name="coupon type select" id="category" onChange={this.onCategoryPipeChanged}>
                    <option defaultValue="" key="defaultValue"></option>
                    {(this.couponTypes).map((couponType, index) => (
                        <option value={couponType.valueOf()} key={index}>{couponType.valueOf()}</option>))}
                </select><br />
        <br />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
          .filter(coupon => coupon.companyName.toLowerCase().includes(this.state.companyFilter))
          .filter(coupon => coupon.category.valueOf().includes(this.state.categoryFilter))
          .map(coupon => <Card key={coupon.id} coupon={coupon} onCardClick={() => this.onCardClick(coupon.id)} />)}
        </ol>}
        <br /><input type="button" className="back" value="Back" onClick={this.onBackClick} />
      </div>
    );
  }
}
