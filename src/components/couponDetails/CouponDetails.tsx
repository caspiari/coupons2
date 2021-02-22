import axios from 'axios';
import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import { User } from '../../models/User';
import "./CouponDetails.css";

// axios.defaults.baseURL = 'http://localhost:3001/';
// let token = "a4234fa234GJSD2R53";
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

interface CouponDetailsState {
  coupon: Coupon;
  userType: string;
  isAdminOrCompany: boolean;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: new Coupon(0, "", ""), userType: "", isAdminOrCompany: false };
  }

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      alert("Please login to see coupon details and purchase");
      this.props.history.push('/coupons');
    }
    axios.defaults.headers.common["Authorization"] = token;
    const id = this.props.match.params.id;

    try {
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);

      const newState = { ...this.state }
      newState.coupon = response.data;
      newState.userType = sessionStorage.getItem("userType");
      newState.userType === "CUSTOMER"? newState.isAdminOrCompany = false : newState.isAdminOrCompany = true;
      this.setState(newState);
    } catch (err) {
      console.log(err.message);
    }
  }

  public render() {
    return (
      <div className="CouponDetails">
        <br />
        <h3>Category: {this.state.coupon.category}</h3>
        <h3>Name: {this.state.coupon.name}</h3>
        <h3>Description: {this.state.coupon.description}</h3>
        <h3>Price: {this.state.coupon.price}</h3>
        <h3>Amount: {this.state.coupon.amount}</h3>
        <h3>Start date: {this.state.coupon.startDate}</h3>
        <h3>End date: {this.state.coupon.endDate}</h3>
        {this.state.isAdminOrCompany == true && <input type="button" value="Delete" />}
        {/* {<ol>
          {this.state.coupons.filter(coupon=> coupon.name.includes(this.state.companyNameFilter) ).
                    map(coupon => <Card key = {coupon.id} {...coupon}/>)}
        </ol>} */}
      </div>
    );
  }
}
