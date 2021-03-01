import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { Coupon } from '../../models/Coupon';

interface ICardProps {
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
          <u>{this.props.companyName}</u>
          <br />
          <i>{this.props.category}</i>
          <br />
          <b>{`Name: ${this.props.name}`}</b>
          <br />
          {`Price: ${this.props.price}`}
          <br />
          {`Units left: ${this.props.amount}`}
          <br />
          {`Expiration date: ${this.props.endDate}`}
        </div>
      </NavLink>
    )
  }
}

