import axios from 'axios';
import { Component } from 'react'
import { User } from '../../models/User';
import { Company as CompanyBean } from '../../models/Company';
import "./Company.css"

interface ICompanyState {
  user: User;
  company: CompanyBean;
}

export default class Company extends Component<any, ICompanyState> {

  constructor(props: any) {
    super(props);
    this.state = { user: new User(), company: new CompanyBean() }
  }

  private userId = sessionStorage.getItem("id");
  private companyId = sessionStorage.getItem("companyId");
  
  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get<User>("http://localhost:8080/users/" + this.userId);
      const companyResponse = await axios.get<Company>("http://localhost:8080/companies/" + this.companyId);
      this.setState({ user: response.data, company: companyResponse.data as CompanyBean });
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      } else {
        console.log(JSON.stringify(err))
      }
    }
  }

  private onMyUserDetailsClick = () => {
    console.log('/userDetails/' + sessionStorage.getItem("id"));
    this.props.history.push('/userDetails/' + sessionStorage.getItem("id"));
  }

  private onMyCompanyDetailsClick = () => {
    this.props.history.push('/companyDetails/' + this.companyId);
  }

  private onMyCompanyCouponsClick = () => {
    this.props.history.push('/coupons');
  }

  private onCreateCouponClick = () => {
    this.props.history.push('/createCoupon');
  }

  public render() {
    return (
      <div className="Company">
        <br />
        <h2>Welcome! {this.state.user.firstName} from {this.state.company.name} :)</h2>
        <br /><br />
        <br /><input type="button" value="My user details" onClick={this.onMyUserDetailsClick} />
        <br /><input type="button" value="My company details" onClick={this.onMyCompanyDetailsClick} />
        <br /><input type="button" value="My company coupons" onClick={this.onMyCompanyCouponsClick} />
        <br /><input type="button" value="Create coupon" onClick={this.onCreateCouponClick} />
      </div>
    );
  }
}

