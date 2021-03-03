import { Component, ChangeEvent } from 'react';
import axios from "axios";
import "./Register.css";
import { User } from '../../models/User';
import ForAdmin from './forAdmin/ForAdmin';
import { UserType } from '../../models/UserType';

interface RegisterState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
    companyId?: number;
}

export default class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = { username: "", password: "", firstName: "", lastName: "", userType: null };
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

    private setUserType = (event: ChangeEvent<HTMLSelectElement>) => {
        const userType = event.target.value;
        this.setState({ userType });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private register = async () => {
        try {
            let user = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
            this.state.userType, this.state.companyId);
            const response = await axios.post<number>("http://localhost:8080/users", user);
            const serverResponse = response.data;
            alert("Successful registration! Your user id is: " + serverResponse);
            this.props.history.goBack();
        }
        catch (err) {
            alert(err.response.data.errorMessage);
        }
    }

    public render() {
        return (
            <div className="register">
                <h1>Register new user</h1>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") == UserType.ADMIN.valueOf() && 
                 <ForAdmin userTypes={['CUSTOMER', 'COMPANY', 'ADMIN']} onUserTypeSelected={this.setUserType} onCompanySelected={this.setCompanyId} /> }
                
                <br />
                <input type="button" value="register" onClick={this.register} />
            </div>
        );
    }

}


