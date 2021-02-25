import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

interface ICardProps {
  companyName: string;
  id: number;
  name: string;
  companyId?: number;
  amount?: number;
  price?: number;
  
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <NavLink to={`/couponDetails/${this.props.id}`}>
        <div className="card">
          {`Company: ${this.props.companyName}`}
          <br />
          {`Coupon ID: ${this.props.id}`}
          <br />
          {`Name: ${this.props.name}`}
          <br />
          {`Amount: ${this.props.amount}`}
          <br />
          {`Price: ${this.props.price}`}
        </div>
      </NavLink>
    )
  }
}

