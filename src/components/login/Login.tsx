import { Component, ChangeEvent } from 'react'
import axios from "axios";
import "./Login.css";
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { UserType } from '../../models/enums/UserType';
import Home from '../home/Home';

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
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
            const serverResponse = response.data;
            const userType: UserType = serverResponse.userType;
            store.dispatch({ type: ActionType.LOGIN, payload: userType });
            sessionStorage.setItem("id", String(serverResponse.id));
            sessionStorage.setItem("token", serverResponse.token);
            sessionStorage.setItem("userType", serverResponse.userType.valueOf());
            if (userType === UserType.COMPANY) {
                sessionStorage.setItem("companyId", String(serverResponse.companyId));
            }
            axios.defaults.headers.common["Authorization"] = serverResponse.token;
            console.log(serverResponse);
            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin')
            }
            else if (serverResponse.userType === "CUSTOMER") {          
                this.props.history.push('/customer')
            }
            else {
                this.props.history.push('/company')
            }
        } catch (err) {
            Home.exceptionTreatment(err, this.props);
        }
        console.log("Login ended");
    }

    private onRegisterClick = () => {
        this.props.history.push('/registerUser');
    }

    private onBackClick = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="login">
                <input type="text" placeholder="User name" name="username" value={this.state.username} onChange={this.setUsername} /><br />
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                <input type="button" value="Login" onClick={this.login} /><br />
                <input type="button" value="Register" onClick={this.onRegisterClick} /><br />
                <input type="button" value="Back" onClick={this.onBackClick} />
            </div>
        );
    }
}
