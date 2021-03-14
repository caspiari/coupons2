import axios from 'axios';
import { Component } from 'react'
import { User } from '../../../models/User';
import "./UserDetails.css";

interface IUserDetailsProps {
  user: User;
  setShowDetails: any;
  setEditMode: any;
}

export default class UserDetails extends Component<IUserDetailsProps> {

  constructor(props: IUserDetailsProps) {
    super(props);
  }

  private onEditClick = () => {
    this.props.setEditMode(true);
  }

  private onDeleteClick = async () => {
    if (window.confirm("Do you want to delete this user?") === true) {
      try {
        await axios.delete("http://localhost:8080/users/" + this.props.user.id);
        alert("User was successfuly deleted");
        // this.props.history.goBack();
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

  private onCloseClick = () => {
    this.props.setShowDetails(false);
  }

  public render() {
    return (
      <div className="userDetails">
        <br />
        <h3>Id: {this.props.user.id}<br />
        User name: {this.props.user.username}<br />
        Name: {this.props.user.firstName} {this.props.user.lastName}<br />
        Type: {this.props.user.userType}<br />
          {this.props.user.companyId != null && `Company id: ${this.props.user.companyId}`}</h3>
        <br /><br />
        <input type="button" value="Edit" onClick={this.onEditClick} />
        {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.onDeleteClick} />}
        <input type="button" value="Close" onClick={this.onCloseClick} /><br /><br />
      </div>
    );
  }
}
