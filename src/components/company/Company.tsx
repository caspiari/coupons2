import axios from 'axios';
import { Component } from 'react'
import { User } from '../../models/User';
import { Company as CompanyBean } from '../../models/Company';
import "./Company.css"
import UserDetails from '../customer/userDetails/UserDetails';
import UpdateUser from '../update/updateUser/UpdateUser';
import UpdateCompany from '../update/updateCompany/UpdateCompany';
import CompanyDetails from './companyDetails/CompanyDetails';
import Home from '../home/Home';

interface ICompanyState {
  user: User;
  company: CompanyBean;
  showUserDetails: boolean;
  showCompanyDetails: boolean;
  showCompanyCoupons: boolean;
  editMode: boolean;
}

export default class Company extends Component<any, ICompanyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: new User(), company: new CompanyBean(), showUserDetails: false, showCompanyDetails: false,
      editMode: false, showCompanyCoupons: false
    };
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
      Home.exceptionTreatment(err, this.props);
    }
  }

  private setShowDetails = (showUserDetails: boolean) => {
    this.setState({ showUserDetails });
  }

  private setShowCompanyDetails = (showCompanyDetails: boolean) => {
    this.setState({ showCompanyDetails });
  }

  private setShowCompanyCoupons = (showCompanyCoupons: boolean) => {
    this.setState({ showCompanyCoupons });
  }

  private setEditMode = (edited: boolean) => { //Refresh component if edited
    if(edited === true) {
      this.componentDidMount();
    }
    this.setState({ editMode: !this.state.editMode });
  }

  private onMyUserDetailsClick = () => {
    this.setState({ showUserDetails: !this.state.showUserDetails });
  }

  private onMyCompanyDetailsClick = () => {
    this.setState({ showCompanyDetails: !this.state.showCompanyDetails });
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
        <h1>Welcome! {this.state.user.firstName} from {this.state.company.name} :)</h1>
        <div>{this.state.showUserDetails === true && (this.state.editMode === true ? <UpdateUser user={this.state.user} setEditMode={this.setEditMode} />
          : <UserDetails user={this.state.user} setShowDetails={this.setShowDetails} setEditMode={this.setEditMode} />)}</div>
        <div>{this.state.showCompanyDetails === true && (this.state.editMode === true ? <UpdateCompany company={this.state.company} setEditMode={this.setEditMode} />
          : <CompanyDetails company={this.state.company} setShowDetails={this.setShowCompanyDetails} setEditMode={this.setEditMode} />)}</div>
        <div>{this.state.showCompanyCoupons === true && (this.state.editMode === true ? <UpdateCompany company={this.state.company} setEditMode={this.setEditMode} />
          : <CompanyDetails company={this.state.company} setShowDetails={this.setShowCompanyDetails} setEditMode={this.setEditMode} />)}</div>
        <br /><br />
        <br /><input type="button" value="My user details" onClick={this.onMyUserDetailsClick} />
        <br /><input type="button" value="My company details" onClick={this.onMyCompanyDetailsClick} />
        <br /><input type="button" value="My company coupons" onClick={this.onMyCompanyCouponsClick} />
        <br /><input type="button" value="Create coupon" onClick={this.onCreateCouponClick} />
      </div>
    );
  }
}

