import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  coupons: Coupon[];
}

export default class Coupons extends Component<any, CouponsState> {

  constructor(props: any) {
    super(props);

    let coupons = new Array<Coupon>();

    let mockCoupon1 = new Coupon(0, "Coca Cola", 100, 200);
    let mockCoupon2 = new Coupon(1, "Pepsi", 200, 150);
    coupons.push(mockCoupon1);
    coupons.push(mockCoupon2);

    this.state = { coupons };
  }


  public render() {
    return (
      <div className="Coupons">
        {/* {this.state.coupons.map(coupon => <div key={coupon.name}><h1>Name: {coupon.name} -- Price: {coupon.price} -- Amount: {coupon.amount}</h1></div>)} */}
        <div className="card">
          <Card id={1} name={'rrrrRR'} /><br/>
        </div><div className="card">
          <Card id={2} name={'ggggGG'} /><br/>
        </div><div className="card">
          <Card id={3} name={'vvvvvVV'} /><br/>
        </div>
      </div>
    );
  }
}
