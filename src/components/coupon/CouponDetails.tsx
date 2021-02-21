import axios from 'axios';
import { Component } from 'react'
import { Coupon } from '../../models/Coupon';
import "./CouponDetails.css";

// axios.defaults.baseURL = 'http://localhost:3001/';
// let token = "a4234fa234GJSD2R53";
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`};

interface CouponDetailsState {
  coupon: Coupon;
}

export default class CouponDetails extends Component<any, CouponDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { coupon: new Coupon(0, "", "") }
  }

  // componentDidMount = ngOnInit in angular (a reserved word)
  // public async componentDidMount() {
  //   try {
  //     const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + this.props.coupon.id);
  //     // response.data = all the coupons that were returned from the server
  //     this.setState({ coupon: response.data });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  public async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + id);
      this.setState({ coupon: response.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  public render() {
    return (
      <div className="CouponDetails">
        <br />
        <h1>Category: {this.state.coupon.category}</h1> <br />
        <h1>Name: {this.state.coupon.name}</h1> <br />
        <h1>Description: {this.state.coupon.description}</h1> <br />
        <h1>Price: {this.state.coupon.price}</h1> <br />
        <h1>Amount: {this.state.coupon.amount}</h1> <br />
        <h1>Start date: {this.state.coupon.startDate}</h1> <br />
        <h1>End date: {this.state.coupon.endDate}</h1> <br />
        {this.props.match.params.userType == "ADMIN" && <input type="button" value="Delete" />}
        {/* {<ol>
          {this.state.coupons.filter(coupon=> coupon.name.includes(this.state.companyNameFilter) ).
                    map(coupon => <Card key = {coupon.id} {...coupon}/>)}
        </ol>} */}
      </div>
    );
  }
}
