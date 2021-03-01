import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Coupon } from '../../models/Coupon';

interface ICardProps {
  coupon: Coupon;
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <NavLink to={`/couponDetails/${this.props.coupon.id}`}>
        <div className="card">
          <u>{this.props.coupon.companyName}</u>
          <br />
          <i>{this.props.coupon.category}</i>
          <br />
          <b>{`Name: ${this.props.coupon.name}`}</b>
          <br />
          {`Price: ${this.props.coupon.price}`}
          <br />
          {`Units left: ${this.props.coupon.amount}`}
          <br />
          {`Expiration date: ${this.props.coupon.endDate}`}
        </div>
      </NavLink>
    )
  }
}

