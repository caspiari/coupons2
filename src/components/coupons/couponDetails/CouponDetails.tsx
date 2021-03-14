import axios from 'axios';
import { Component } from 'react'
import { Coupon } from '../../../models/Coupon';
import { Purchase } from '../../../models/Purchase';
import { UserType } from '../../../models/enums/UserType';
import Card from '../../card/Card';
import "./CouponDetails.css";
import Home from '../../home/Home';

interface CouponDetailsState {
  coupon: Coupon;
  purchaseAmount: number;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: new Coupon(), purchaseAmount: 0 };
  }

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const id = this.props.match.params;
    try {
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
      const coupon = response.data;
      this.setState({ coupon });
    } catch (err) {
      Home.exceptionTreatment(err, this.props);
    }
  }

  private delete = async () => {
    if (window.confirm("Do you want to delete this coupon?") === true) {
      try {
        await axios.delete("http://localhost:8080/coupons/" + this.state.coupon.id);
        alert("Coupon was successfuly deleted");
        this.props.history.goBack();
      } catch (err) {
        Home.exceptionTreatment(err, this.props);
      }
    }
  }

  private onPurchaseAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const purchaseAmount = +event.target.value;
    this.setState({ purchaseAmount });
  }

  private purchase = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      let purchase = new Purchase(this.state.coupon.id, this.state.purchaseAmount, +userId, this.state.coupon.name);
      const response = await axios.post<number>("http://localhost:8080/purchases", purchase);
      const serverResponse = response.data;
      alert("Successful purchase! Your purchase id is: " + serverResponse);
      this.props.history.push('/coupons');
    } catch (err) {
      Home.exceptionTreatment(err, this.props);
    }
  }

  private onEditClick = () => {
    this.props.history.push('/updateCoupon/' + this.state.coupon.id);
  }

  private back = () => {
    this.props.history.goBack();
  }

  public render() {
    return (
      <div className="CouponDetails">
        <h2>Coupon details: (id: {this.state.coupon.id})</h2>
        <br />
        <h3>Company: {this.state.coupon.companyName}</h3>
        <h3>Category: {this.state.coupon.category}</h3>
        <h3>Name: {this.state.coupon.name}</h3>
        <h3>Description: {this.state.coupon.description}</h3>
        <h3>Price: {this.state.coupon.price}</h3>
        <h3>Amount in stock: {this.state.coupon.amount}</h3>
        <h3>Start date: {Card.formatTime(this.state.coupon.startDate)}</h3>
        <h3>End date: {Card.formatTime(this.state.coupon.endDate)}</h3>
        {sessionStorage.getItem("userType") === UserType.CUSTOMER.valueOf()
          && <div><h2>How many I want: </h2><input type="number" className="number" onChange={this.onPurchaseAmountChanged} />
            <input type="button" value="purchase" onClick={this.purchase} /></div>}
        {sessionStorage.getItem("userType") !== UserType.CUSTOMER.valueOf() && <span>
          <input type="button" value="Delete" onClick={this.delete} />&nbsp;
          <input type="button" value="Edit" onClick={this.onEditClick} /></span>}
        &nbsp;&nbsp;<input type="button" value="Back" onClick={this.back} />
      </div>
    );
  }
}
