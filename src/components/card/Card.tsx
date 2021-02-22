import axios from 'axios';
import React, { Component, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Company } from '../../models/Company';

interface ICardProps {
  id: number;
  name: string;
  companyId?: number;
  amount?: number;
  price?: number;
}

interface ICardState {
  companyName: string;
}

export default class Card extends Component<any, ICardState> {

  public constructor(props: any) {
    super(props);
    this.state = { companyName: "" };
  }

  // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    try {
      const response = await axios.get<Company>("http://localhost:8080/companies/" + this.props.companyId);
      // response.data = all the coupons that were returned from the server
      this.setState({ companyName: response.data.name });
    } catch (err) {
      console.log(err.message);
    }
  }

  // private async getCoupon(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //   try {
  //     const id = event.
  //     const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
  //     // response.data = all the coupons that were returned from the server
  //     this.setState({ coupons: response.data });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  private couponClick = () => {
    // this.props.history.push('/couponDetails/' + this.props.id)
  }



  public render() {
    return (
      // <NavLink to={"/couponDetails/" + this.props.id}>
        <div className="card" onClick={this.couponClick}>
          {`Company: ${this.state.companyName}`}
          <br />
          {`ID: ${this.props.id}`}
          <br />
          {`Name: ${this.props.name}`}
          <br />
          {`Amount: ${this.props.amount}`}
          <br />
          {`Price: ${this.props.price}`}
        </div>
      // </NavLink>
    )
  }
}

