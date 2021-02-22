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
  isAdminOrCompany : boolean;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: new Coupon(0, "", ""), isAdminOrCompany: false }
  }

  public async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
      const userId = this.props.params.userId;
      const user = await axios.get<User>("http://localhost:8080/users/" + id);
      this.setState({ coupon: response.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  public render() {
    return (
      <div className="CouponDetails">
        <br />
        <h3>Category: {this.state.coupon.category}</h3> <br />
        <h3>Name: {this.state.coupon.name}</h3> <br />
        <h3>Description: {this.state.coupon.description}</h3> <br />
        <h3>Price: {this.state.coupon.price}</h3> <br />
        <h3>Amount: {this.state.coupon.amount}</h3> <br />
        <h3>Start date: {this.state.coupon.startDate}</h3> <br />
        <h3>End date: {this.state.coupon.endDate}</h3> <br />
        {(this.props.match.params.userType == "ADMIN") && <input type="button" value="Delete" />}
        {/* {<ol>
          {this.state.coupons.filter(coupon=> coupon.name.includes(this.state.companyNameFilter) ).
                    map(coupon => <Card key = {coupon.id} {...coupon}/>)}
        </ol>} */}
      </div>
    );
  }
}
