import axios from 'axios';
import { Component } from 'react'
import { User } from '../../models/User';
import './Customer.css';

interface ICustomerState {
  user: User;
}

export default class Customer extends Component<any, ICustomerState> {

  constructor(props: any) {
    super(props);
    this.state = { user: new User() }
  }

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get<User>("http://localhost:8080/users/" + id);
      this.setState({ user: response.data });
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      } else {
        console.log(JSON.stringify(err))
      }
    }
  }

  private onMyDetailsClick = () => {
    this.props.history.push('/userDetails' + this.state.user.id);
  }

  private onMyCouponsClick = () => {
    this.props.history.push('/myCoupons');
  }

  public render() {
    return (
      <div className="customer">
        <h2>Hello {this.state.user.firstName} :)</h2>
        <br /><input type="button" value="My details" onClick={this.onMyDetailsClick} />
        <br /><input type="button" value="My coupons" onClick={this.onMyCouponsClick} />
      </div>
    );
  }
}
