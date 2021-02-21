// import { Component, ChangeEvent } from 'react'
import React, { Component, Fragment, ChangeEvent } from 'react';
import axios from "axios";
import "./Register.css";
import { User } from '../../models/User';
// import Select from 'react-select';


interface RegisterState {
    user: User;
    isClearable: boolean;
}

export default class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = { user: new User("", "", "", "", ["CUSTOMER", "COMPANY"]), isClearable : true };
    }

    private setUser = (event: ChangeEvent<HTMLInputElement>) => {
        // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
        // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
        // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
        // const user = event.target.value;
        // this.setState({ user });
    }

    private register = async () => {
        console.log("Entered register");

        // try {
        //     let userLoginDetails = new UserLoginDetails(this.state.username, this.state.password);
        //     const response =  await axios.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
        //     const serverResponse = response.data;
        //     sessionStorage.setItem("token", serverResponse.token);
        //     sessionStorage.setItem("userType",serverResponse.userType);
        //     axios.defaults.headers.common["Authorization"]= serverResponse.token;
        //     console.log(serverResponse);
        // 
        //     if (serverResponse.userType === "ADMIN") {
        //         this.props.history.push('/admin')
        //         sessionStorage.setItem("userType", "ADMIN");
        //     }
        //     else if (serverResponse.userType === "CUSTOMER") {
        //         this.props.history.push('/customer')
        //         sessionStorage.setItem("userType", "CUSTOMER");
        //     }
        //     else{
        //         this.props.history.push('/company')
        //         sessionStorage.setItem("userType", "COMPANY");
        //     }
        // 
        // }
        // catch (err) {
        //     alert(err.message);
        //     console.log(JSON.stringify(err));
        // }
        console.log("Register ended");
    }

    public render() {
        return (
            <div className="register">
                <h1> nla blabla</h1>
                User name: <input type="text" name="username" value={this.state.user.username} onChange={this.setUser} /><br />
                Password: <input type="password" name="password" value={this.state.user.password} onChange={this.setUser} /><br />
                First name: <input type="text" name="firstName" value={this.state.user.firstName} onChange={this.setUser} /><br />
                Last name: <input type="text" name="lastName" value={this.state.user.lastName} onChange={this.setUser} /><br />
                User type: <select name="userType">
                                <option value ={this.state.user.userType[0]}>Customer</option>
                                <option value ={this.state.user.userType[1]}>Company</option>
                           </select>
                           <br />
                Company id: <input type="password" name="password" value={this.state.user.password} onChange={this.setUser} /><br />

                {/* <input type="button" value="login" onClick={this.login} /> */}
            </div>
        );
    }

}

