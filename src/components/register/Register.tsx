// import { Component, ChangeEvent } from 'react'
import React, { Component, Fragment, ChangeEvent } from 'react';
import axios from "axios";
import "./Register.css";
import { User } from '../../models/User';
// import Select from 'react-select';


interface RegisterState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
    id?: number;
    companyId?: number;
}

export default class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = { username : "", password : "", firstName : "", lastName : "", userType : "" };
    }

    private setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        this.setState({ username });
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        this.setState({ password });
    }

    private setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        const firstName = event.target.value;
        this.setState({ firstName });
    }

    private setLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const lastName = event.target.value;
        this.setState({ lastName });
    }

    private setUserType = (event: ChangeEvent<HTMLInputElement>) => {
        const userType = event.target.value;
        this.setState({ userType });
    }

    private setId = (event: ChangeEvent<HTMLInputElement>) => {
        const id = +event.target.value;
        this.setState({ id });
    }
    
    private setCompanyId = (event: ChangeEvent<HTMLInputElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private register = async () => {
        console.log("Entered register");

        try {
            let user = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                this.state.userType, this.state.companyId);
            if(this.state.userType == null) {
                user.userType = "CUSTOMER";
            }
            const response =  await axios.post<number>("http://localhost:8080/users", user);
            const serverResponse = response.data;
            user.id = serverResponse;
            alert("Successful registration! Your user id is: " + serverResponse);
        
        }
        catch (err) {
            alert(err.message);
            console.log(JSON.stringify(err));
        }
        console.log("Register ended");
    }

    public render() {
        return (
            <div className="register">
                <h1>Register new user</h1>
                User name: <input type="text" name="username" value={this.state.username} onChange={this.setUsername} /><br />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />

                {/* If the user is admin...: */}
                {/* User type: <select name="userType">
                                <option value ={this.state.user.userType}>Customer</option>
                                <option value ={this.state.user.userType}>Company</option>
                           </select> */}
                           {/* <br /> */}
                {/* Company id: <input type="password" name="password" value={this.state.user.password} onChange={this.setUser} /><br /> */}

                <input type="button" value="register" onClick={this.register} />
            </div>
        );
    }

}

