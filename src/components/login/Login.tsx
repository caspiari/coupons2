import { Component, ChangeEvent } from 'react'
import axios from "axios";
import "./Login.css";
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

interface ILoginState {
    username: string,
    password: string
}

export default class Login extends Component<any, ILoginState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    private setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        this.setState({ username });
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        this.setState({ password });
    }

    private login = async () => {
        console.log("Entered login");

        try {
            let userLoginDetails = new UserLoginDetails(this.state.username, this.state.password);
            const response =  await axios.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
            store.dispatch({ type: ActionType.Login, payload: true});
            const serverResponse = response.data;
            sessionStorage.setItem("id", String(serverResponse.id));
            sessionStorage.setItem("token", serverResponse.token);
            sessionStorage.setItem("userType",serverResponse.userType);
            axios.defaults.headers.common["Authorization"]= serverResponse.token;
            console.log(serverResponse);
            
            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin')
            }
            else if (serverResponse.userType === "CUSTOMER") {
                this.props.history.push('/customer')
            }
            else{
                this.props.history.push('/company')
            }
        }
        catch (err) {
            alert(err.message);
            console.log(JSON.stringify(err));
        }
        console.log("Login ended");
    }

    public render() {
        return (
            <div className="login">
                <input type="text" placeholder="User name" name="username" value={this.state.username} onChange={this.setUsername} /><br />
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                <div><input type="button" value="Login" onClick={this.login} /></div>
                <NavLink to={"/register"}>
                    <input type="button" className="registerInput" value="Register" />
                </NavLink>
            </div>
        );
    }
}
