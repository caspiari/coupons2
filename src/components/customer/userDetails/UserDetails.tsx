import axios from 'axios';
import React, { ChangeEvent, Component } from 'react'
import { Company } from '../../../models/Company';
import { UserType } from '../../../models/enums/UserType';
import { User } from '../../../models/User';
import { ActionType } from '../../../redux/action-type';
import { store } from '../../../redux/store';
import Home from '../../home/Home';
import IfAdmin from '../updateUser/ifAdmin/IfAdmin';
import "./UserDetails.css";

interface IUserDetailsProps {
  user: User;
  setShowDetails: any;
  setEditMode: any; //With boolean veriable to tell if made changes or not
}

interface IUserDetailsState {
  editMode: boolean;
  companies: Company[];
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  companyId?: number;
}

export default class UserDetails extends Component<IUserDetailsProps, IUserDetailsState> {

  constructor(props: any) {
    super(props);
    this.state = { editMode: false, companies: [], username: this.props.user.username, password: this.props.user.password, firstName: this.props.user.firstName, 
      lastName: this.props.user.lastName, userType: this.props.user.userType, companyId: this.props.user.companyId };
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

  //   private onEditClick = () => {
  //     this.props.setEditMode(false);
  //   }
  
  // private onBackClick = () => {
  //   this.props.setShowDetails();
  // }

  public render() {
    return (
      <div className="userDetails">
        {!this.state.editMode && <div>
        <br /><h2><u>User details:</u></h2><br />
        <h3>Id: {this.props.user.id}<br />
        User name: {this.props.user.username}<br />
        Name: {this.props.user.firstName} {this.props.user.lastName}<br />
        Type: {this.props.user.userType}<br />
        {this.props.user.companyId != null && `Company id: ${this.props.user.companyId}`}</h3>
        <br /><br />
        <input type="button" value="Edit" onClick={() => this.props.setEditMode(false)} />
        {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.onDeleteClick} />}
        <input type="button" value="Back" onClick={() => this.props.setShowDetails()} /><br /><br /></div>}
        
        {this.state.editMode && <div>
          <h2><u>Update user: Id: {this.props.user.id}</u></h2>
                <label htmlFor="username">User name:</label>
                <input type="text" name="username" id="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.setPassword} /><br />
                <label htmlFor="firstName">First name:</label>
                <input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin key={"ifAdmin"} userTypes={this.userTypes} companies={this.state.companies}
                    userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Edit" onClick={this.onEditClick} />
                <input type="button" value="Back" onClick={() => this.setState({ editMode: false })} /><br /><br />
          </div>}
      </div>
    );
  }
}
