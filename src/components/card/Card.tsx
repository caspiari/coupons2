import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

interface ICardProps {
  // coupon: Coupon;
  id:number,
  companyName: string,
  category:string,
  name:string,
  description:string,
  price:number,    
  amount:number,
  startDate:Date,
  endDate:Date,
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <NavLink to={`/couponDetails/${this.props.id}`}>
        <div className="card">
          <b>{this.props.companyName}</b>
          <br />
          <b>{this.props.category}</b>
          <br />
          {`Name: ${this.props.name}`}
          <br />
          {`Price: ${this.props.price}`}
          <br />
          {`Units left: ${this.props.amount}`}
          <br />
          {`Expiry date: ${this.props.endDate}`}
        </div>
      </NavLink>
    )
  }
}

