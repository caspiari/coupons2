import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Company } from '../../models/Company';
import { Coupon } from '../../models/Coupon';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  coupons: Coupon[];
  companies: Company[];
  companyNameFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  constructor(props: any) {
    super(props);
    this.state = { cards: [], coupons: [], companies: [], companyNameFilter: "" };
  }


  // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    try {
      const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
      const companiesResponse = await axios.get<Company[]>("http://localhost:8080/companies")
      // response.data = all the coupons that were returned from the server
      this.setState({ coupons: response.data, companies: companiesResponse.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ companyNameFilter: text });
  }

  public render() {
    return (
      <div className="Coupons">
        <br />
        Search by name: <input type="text" onChange={this.onCouponsPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon=> coupon.name.includes(this.state.companyNameFilter.toLowerCase())).
                    map(coupon => <Card key = {coupon.id} {...coupon}/>)}
        </ol>}
      </div>
    );
  }
}
