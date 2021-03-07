import axios from 'axios';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { Purchase } from '../../models/Purchase';
import { UserType } from '../../models/UserType';
import { store } from '../../redux/store';
import Card from '../card/Card';
import "./CouponDetails.css";

interface CouponDetailsState {
  userType: UserType;
  isAdminOrCompany: boolean;
  coupon: Coupon;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { userType: null, isAdminOrCompany: false, coupon: new Coupon(null, null, null, null, null, null, null, null) };
  }

  private unsubscribeStore: Unsubscribe;
  private purchaseAmount: number;
  private couponId: number = this.props.match.params.id;

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      alert("Please login/register in order to see coupon details and to purchase");
      this.props.history.goBack();
    }
    axios.defaults.headers.common["Authorization"] = token;

    this.unsubscribeStore = store.subscribe(
      () => this.setState(
        { userType: store.getState().userType })
    );

    try {
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + this.couponId);
      let newState = { ...this.state };
      newState.coupon = response.data;
      newState.userType === "CUSTOMER" ? newState.isAdminOrCompany = false : newState.isAdminOrCompany = true;
      this.setState(newState);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private delete = async () => {
    if (window.confirm("Do you want to delete this coupon?") === true) {
      try {
        const response = await axios.delete("http://localhost:8080/coupons/" + this.couponId);
        this.setState({ coupon: response.data });
        alert("Coupon was successfuly deleted");
        this.props.history.goBack();
      } catch (err) {
        console.log(err.message + "\n" + err.response.data.errorMessage);
      }
    }
  }

  private onPurchaseAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.purchaseAmount = +event.target.value;
  }

  private purchase = async () => {
    try {
      const couponId = this.props.match.params.id;
      const couponName = this.props.match.params.couponName;
      const userId = sessionStorage.getItem("userId");
      let purchase = new Purchase(couponId, this.purchaseAmount, +userId, couponName);
      const response = await axios.post<number>("http://localhost:8080/purchases", purchase);
      const serverResponse = response.data;
      alert("Successful purchase! Your purchase id is: " + serverResponse);
      this.props.history.push('/coupons');
    } catch (err) {
      console.log(err.message);
    }
  }

  public render() {
    return (
      <div className="CouponDetails">
        <br />
        <h3>Company: {this.state.coupon.companyName}</h3>
        <h3>Category: {this.state.coupon.category}</h3>
        <h3>Name: {this.state.coupon.name}</h3>
        <h3>Description: {this.state.coupon.description}</h3>
        <h3>Price: {this.state.coupon.price}</h3>
        <h3>Amount: {this.state.coupon.amount}</h3>
        <h3>Start date: {Card.formatTime(this.state.coupon.startDate)}</h3>
        <h3>End date: {Card.formatTime(this.state.coupon.endDate)}</h3>
        {sessionStorage.getItem("userType") === UserType.CUSTOMER.valueOf()
          && <div><h2>How many I want: </h2><input type="number" className="number" onChange={this.onPurchaseAmountChanged} />
            <input type="button" value="purchase" onClick={this.purchase} /></div>}
        {sessionStorage.getItem("userType") !== UserType.CUSTOMER.valueOf() && <input type="button" value="Delete" onClick={this.delete} />}
      </div>
    );
  }
}
