import axios from 'axios';
import { Component } from 'react'
import { User } from '../../../models/User';
import Home from '../../home/Home';
import "./UserDetails.css";

interface IUserDetailsProps {
  user: User;
  setShowDetails: any;
  setEditMode: any;
}

export default class UserDetails extends Component<IUserDetailsProps> {

  private onEditClick = () => {
    this.props.setEditMode(false);
  }

  private onDeleteClick = async () => {
    if (window.confirm("Do you want to delete this user?") === true) {
      try {
        await axios.delete("http://localhost:8080/users/" + this.props.user.id);
        alert("User was successfuly deleted");
        // this.props.setShowDetails(false);
        this.props.setShowDetails();
      } catch (err) {
        Home.exceptionTreatment(err, this.props);
      }
    }
  }

  private onBackClick = () => {
    this.props.setShowDetails();
  }

  public render() {
    return (
      <div className="userDetails">
        <br /><h2><u>User details:</u></h2><br />
        <h3>Id: {this.props.user.id}<br />
        User name: {this.props.user.username}<br />
        Name: {this.props.user.firstName} {this.props.user.lastName}<br />
        Type: {this.props.user.userType}<br />
          {this.props.user.companyId != null && `Company id: ${this.props.user.companyId}`}</h3>
        <br /><br />
        <input type="button" value="Edit" onClick={this.onEditClick} />
        {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.onDeleteClick} />}
        <input type="button" value="Back" onClick={this.onBackClick} /><br /><br />
      </div>
    );
  }
}
