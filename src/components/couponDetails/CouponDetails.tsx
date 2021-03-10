import axios from 'axios';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../models/Coupon';
import { Purchase } from '../../models/Purchase';
import { UserType } from '../../models/enums/UserType';
import { store } from '../../redux/store';
import Card from '../card/Card';
import "./CouponDetails.css";

interface CouponDetailsState {
  // userType: UserType;
  isAdminOrCompany: boolean;
  coupon: Coupon;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { isAdminOrCompany: false, coupon: this.props.location.state.coupon };
  }

  private unsubscribeStore: Unsubscribe;
  private purchaseAmount: number;
  // private couponId: number = this.props.match.params.id;

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      alert("Please login/register in order to see coupon details and to purchase");
      this.props.history.goBack();
    }

    this.unsubscribeStore = store.subscribe(
      () => this.setState({})
    );
    store.getState().userType === "CUSTOMER" ? this.setState({ isAdminOrCompany: false }) : this.setState({ isAdminOrCompany: true });

    // axios.defaults.headers.common["Authorization"] = token;
    // try {
    // const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + this.couponId);
    // let newState = { ...this.state };
    // newState.coupon = response.data;
    // newState.userType === "CUSTOMER" ? newState.isAdminOrCompany = false : newState.isAdminOrCompany = true;
    // this.setState(newState);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private edit = () => {
    this.props.history.push({
      pathname: '/updateCoupon',
      state: {
        coupon: this.state.coupon,
        // companyName: this.state.coupon.companyName,
        // category: this.state.coupon.category,
        // name: this.state.coupon.name,
        // description: this.state.coupon.description,
        // price: this.state.coupon.price,
        // amount: this.state.coupon.amount,
        // startDate: this.state.coupon.startDate,
        // endDate: this.state.coupon.endDate
      }
    });
  }

  private delete = async () => {
    if (window.confirm("Do you want to delete this coupon?") === true) {
      try {
        await axios.delete("http://localhost:8080/coupons/" + this.state.coupon.id);
        alert("Coupon was successfuly deleted");
        this.props.history.goBack();
      } catch (err) {
        if (err.response != null) {
          let errorMessage: string = err.response.data.errorMessage;
          alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
        } else {
          console.log(JSON.stringify(err))
        }
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

  private back = () => {
    this.props.history.goBack();
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
        <h3>Amount in stock: {this.state.coupon.amount}</h3>
        <h3>Start date: {Card.formatTime(this.state.coupon.startDate)}</h3>
        <h3>End date: {Card.formatTime(this.state.coupon.endDate)}</h3>
        {sessionStorage.getItem("userType") === UserType.CUSTOMER.valueOf()
          && <div><h2>How many I want: </h2><input type="number" className="number" onChange={this.onPurchaseAmountChanged} />
            <input type="button" value="purchase" onClick={this.purchase} /></div>}
        {sessionStorage.getItem("userType") !== UserType.CUSTOMER.valueOf() && <span>
          <input type="button" value="Delete" onClick={this.delete} />&nbsp;
          <input type="button" value="Edit" onClick={this.edit} /></span>}
        &nbsp;&nbsp;<input type="button" value="Back" onClick={this.back} />
      </div>
    );
  }
}
