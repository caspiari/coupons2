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
    
      public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("id");
        const companyId = sessionStorage.getItem("id");
        axios.defaults.headers.common["Authorization"] = token;
        try {
          const response = await axios.get<User>("http://localhost:8080/users/" + userId);
          const companyResponse = await axios.get<Company>("http://localhost:8080/companies/" + companyId);
          this.setState({ user: response.data, company: companyResponse as CompanyBean });
        } catch (err) {
          if (err.response != null) {
            let errorMessage: string = err.response.data.errorMessage;
            alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
          } else {
            console.log(JSON.stringify(err))
          }
        }
      }

      private myUserDetails = () => {
        this.props.history.push({
          pathname: '/userDetails',
          state: {
            username: this.state.user.username,
            password: this.state.user.password,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            userType: this.state.user.userType,
            companyId: this.state.user.companyId,
            id: this.state.user.id
          }
        });
      }

    public render() {
        return (
            <div className="Company">
                <br />
                <h2>Welcome {this.state.user.firstName} from {this.state.company.name} :)</h2>
                <br /><br />
                <br /><input type="button" value="My user details" onClick={this.myUserDetails} />
                <br /><input type="button" value="My company coupons" onClick={this.props.history.push('/companyDetails')} />
                <br /><input type="button" value="Create coupon" onClick={this.props.history.push('/createCoupon')} />
            </div>
        );
    }
}
