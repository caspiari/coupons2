import { Component } from 'react';
import { Coupon } from '../../models/Coupon';
import './Card.css';

interface ICardProps {
  coupon: Coupon;
  onCardClick: any;
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public static formatTime(time, prefix = "") {
    let date = Date.parse(time); // returns NaN if it can't parse
    let dateObject = new Date(date);
    return Number.isNaN(date) ? "" : prefix + dateObject.toLocaleDateString();
  }

  public render() {
    return (
        <div className="card" onClick={this.props.onCardClick}>
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
          {`Expiration date: ${Card.formatTime(this.props.coupon.endDate)}`}
          <br />
        </div>

    )
  }
}

