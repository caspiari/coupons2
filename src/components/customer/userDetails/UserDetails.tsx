import axios from 'axios';
import { Component } from 'react'
import { User } from '../../../models/User';
import "./UserDetails.css";

interface IUserDetailsState {
  user: User;
}

export default class UserDetails extends Component<any, IUserDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { user: new User() };
  }

  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const id = this.props.match.params;
    try {
      const response = await axios.get<User>("http://localhost:8080/users/" + id);
      const user = response.data;
      this.setState({ user });
    } catch (err) {
      if (err.response != null) {
        let errorMessage: string = err.response.data.errorMessage;
        alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
      } else {
        console.log(JSON.stringify(err))
      }
    }
  }

  private edit = () => {
    this.props.history.push('/updateUser/' + this.state.user.id);
  }

  private delete = async () => {
    if (window.confirm("Do you want to delete this user?") === true) {
      try {
        await axios.delete("http://localhost:8080/users/" + this.state.user.id);
        alert("User was successfuly deleted");
        this.props.history.goBack();
      } catch (err) {
        if (err.response != null) {
          let errorMessage: string = err.response.data.errorMessage;
          alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
        } else {
          console.log(JSON.stringify(err.data))
        }
      }
    }
  }

  private back = () => {
    this.props.history.goBack();
  }

  public render() {
    return (
      <div className="userDetails">
        <br />
        <h3>Id: {this.state.user.id}<br />
        User name: {this.state.user.username}<br />
        Name: {this.state.user.firstName} {this.state.user.lastName}<br />
        Type: {this.state.user.userType}<br />
          {this.state.user.companyId != null && `Company id: ${this.state.user.companyId}`}</h3>
        <br /><br />
        <input type="button" value="Edit" onClick={this.edit} />
        {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.delete} />}
        <input type="button" value="Back" onClick={this.back} />

      </div>
    );
  }
}
