import axios from 'axios';
import React, { Component } from 'react'
import { User } from '../../models/User';
import Home from '../home/Home';
import UpdateUser from './updateUser/UpdateUser';
import './Customer.css';
import UserDetails from './userDetails/UserDetails';

interface ICustomerState {
  user: User;
  editMode: boolean;
  showDetails: boolean;
}

export default class Customer extends Component<any, ICustomerState> {
  
  constructor(props: any) {
    super(props);
    this.state = { user: new User(), editMode: false, showDetails: false }
  }
  
  public async componentDidMount() {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get<User>("http://localhost:8080/users/" + id);
      this.setState({ user: response.data });
    } catch (err) {
      Home.exceptionTreatment(err, this.props);
    }
  }

  private setShowDetails = (showDetails: boolean) => {
    this.setState({ showDetails });
  }

  private setEditMode = (edited: boolean) => { //Refresh component if edited
    if(edited === true) {
      this.componentDidMount();
    }
    this.setState({ editMode: !this.state.editMode });
  }

  private onMyDetailsClick = () => {
    this.setState({ showDetails: !this.state.showDetails });
  }

  private onMyCouponsClick = () => {
    this.props.history.push('/myCoupons');
  }

  public render() {
    return (
      <div className="customer">
        <h1>Hello {this.state.user.firstName} :)</h1>
        <div>{this.state.showDetails === true && (this.state.editMode === true ? <UpdateUser user={this.state.user} setEditMode={this.setEditMode} />
             : <UserDetails user={this.state.user} setShowDetails={this.setShowDetails} setEditMode={this.setEditMode} />)}
             {!this.state.showDetails && <div>
              <br /><input type="button" value="My details" onClick={this.onMyDetailsClick} />
              <br /><input type="button" value="My coupons" onClick={this.onMyCouponsClick} />
              </div>}
        </div>
      </div>
    );
  }
}
