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
    const user = new User(this.props.location.state.username, this.props.location.state.password, this.props.location.state.firstName,
      this.props.location.state.lastName, this.props.location.state.userType, this.props.location.state.id, this.props.location.state.companyId);
    this.state = { user };
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

  private editUser = () => {
    this.props.history.push({
      pathname: '/updateUser',
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
        <input type="button" value="Edit" onClick={this.editUser} />
        {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.delete} />}
        <input type="button" value="Back" onClick={this.back} />

      </div>
    );
  }
}
