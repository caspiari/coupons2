import React, { Component, ChangeEvent } from 'react'
import axios from "axios";
import "./Login.css";
import { UserLoginDetails } from '../../models/UserLoginDetails';

interface LoginState {
    userName: string,
    password: string
}

export default class Login extends Component<any, LoginState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
        // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
        // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
        // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
        const userName = event.target.value;
        this.setState({ userName });
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        this.setState({ password });
    }

    private login = async () => {
        console.log("Entered login");

        // fetch("http://localhost:3002/products")
        //     .then(response => response.json())
        //     .then(products => this.setState({ products }))
        //     .catch(err => alert(err.message));

        try {
            let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
            const response =  await axios.post<UserLoginDetails[]>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;
            console.log(serverResponse);
            // console.log(this.state.userName);
            // console.log(this.state.password);

        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
        console.log("Login ended");
    }

    public render() {
        return (
            <div className="login">
                <input type="text" placeholder="User name" name="username" value={this.state.userName} onChange={this.setUserName} /><br />
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                <input type="button" value="login" onClick={this.login} />
            </div>
        );
    }
}
