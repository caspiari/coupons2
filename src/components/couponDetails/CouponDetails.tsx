import axios from 'axios';
import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import { Purchase } from '../../models/Purchase';
import "./CouponDetails.css";

interface CouponDetailsState {
  coupon: Coupon;
  userType: string;
  isAdminOrCompany: boolean;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: null, userType: "", isAdminOrCompany: false };
  }

  private purchaseAmount: number;
  private couponId: number = this.props.match.params.id;

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      alert("Please login in order to see coupon details and to purchase");
      this.props.history.goBack();
    }
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + this.couponId);
      const newState = { ...this.state }
      newState.coupon = response.data;
      newState.userType = sessionStorage.getItem("userType");
      newState.userType === "CUSTOMER" ? newState.isAdminOrCompany = false : newState.isAdminOrCompany = true;
      this.setState(newState);
    } catch (err) {
      console.log(err.message);
    }
  }

  private delete = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/coupons/" + this.couponId);
      this.setState({ coupon: response.data });
      alert("Coupon was successfuly deleted");
      this.props.history.goBack();
    } catch (err) {
      console.log(err.message);
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
        <h3>Start date: {this.state.coupon.startDate}</h3>
        <h3>End date: {this.state.coupon.endDate}</h3>
        {!this.state.isAdminOrCompany
          && <h1>how many i want: </h1>}
        {!this.state.isAdminOrCompany
          && <input type="number" onChange={this.onPurchaseAmountChanged} />}
        {!this.state.isAdminOrCompany
          && <input type="button" value="purchase" onClick={this.purchase} />} 
        {this.state.isAdminOrCompany === true && <input type="button" value="Delete" onClick={this.delete} />}
      </div>
    );
  }
}
