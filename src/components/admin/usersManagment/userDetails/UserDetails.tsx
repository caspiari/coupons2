import axios from 'axios';
import { Component } from 'react'
import { User } from '../../../../models/User';
import "../UsersManagement.css";

interface UserDetailsState {
    user: User;
    editMode: boolean;
}

export default class UserDetails extends Component<any, UserDetailsState> {

  constructor(props: any) {
    super(props);
    
    this.state = { user: this.props.location.state.user, editMode: false };
  }

//   public async componentDidMount() {
//     const token = sessionStorage.getItem("token");
//     if (token == null) {
//       alert("Please login/register in order to see coupon details and to purchase");
//       this.props.history.goBack();
//     }
//     axios.defaults.headers.common["Authorization"] = token;

    // try {
    //   const response = await axios.get<Coupon>("http://localhost:8080/coupons/" + this.couponId);
    //   let newState = { ...this.state };
    //   this.setState(newState);
    // } catch (err) {
    //   console.log(err);
    // }
//   }

//   private onPurchaseAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.purchaseAmount = +event.target.value;
//   }

//   private purchase = async () => {
//     try {
//       const couponId = this.props.match.params.id;
//       const couponName = this.props.match.params.couponName;
//       const userId = sessionStorage.getItem("userId");
//       let purchase = new Purchase(couponId, this.purchaseAmount, +userId, couponName);
//       const response = await axios.post<number>("http://localhost:8080/purchases", purchase);
//       const serverResponse = response.data;
//       alert("Successful purchase! Your purchase id is: " + serverResponse);
//       this.props.history.push('/coupons');
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

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
        <input type="button" value="Update details" onClick={this.editUser} />
        <input type="button" value="Delete" onClick={this.delete} />
        <input type="button" value="Back" onClick={this.back} />

      </div>
    );
  }
}
