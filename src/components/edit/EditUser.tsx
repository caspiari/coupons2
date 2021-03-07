import { Component, ChangeEvent } from 'react';
import axios from "axios";
import "./Edit.css";
import { User } from '../../models/User';
import { UserType } from '../../models/UserType';
import { Company } from '../../models/Company';

interface IEditUserState {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    companies: Company[];
    companyId?: number;
    companyName?: string;
}

export default class EditUser extends Component<any, IEditUserState> {

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public constructor(props: any) {
        super(props);
        this.state = { userId: 0, username: "", password: "", firstName: "", lastName: "", userType: null, companies: [] };
    }
    
    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        const userId = this.props.match.params.id;
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get<User>("http://localhost:8080/users/" + userId);
            let newState = {...this.state};
            newState.userId = response.data.id;
            newState.username = response.data.username;
            newState.password = response.data.password;
            newState.firstName = response.data.firstName;
            newState.lastName = response.data.lastName;
            newState.userType = response.data.userType as UserType;
            newState.companyId = response.data.companyId;
            const companiesResponse = await axios.get<Company[]>("http://localhost:8080/companies");
            newState.companies = companiesResponse.data;
            if(response.data.userType === UserType.COMPANY && response.data.companyId !== null) {
                newState.companyName = newState.companies.filter(company => company.id === newState.companyId)[0].name;
            }
            this.setState(newState);
        } catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            }
        }
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
        const userType = event.target.value as UserType;
        this.setState({ userType });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private edit = async () => {
        try {
            let user = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                this.state.userType, this.state.userId, this.state.companyId);
            const response = await axios.put("http://localhost:8080/users", user);
            const serverResponse = response.data;
            alert("Successfuly updated!");
            this.props.history.goBack();
        }
        catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            }
        }
    }

    public render() {
        return (
            <div className="edit">
                <h1>Edit user (Id: {this.state.userId})</h1>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {/* //  <ForAdmin userTypes={['CUSTOMER', 'COMPANY', 'ADMIN']} onUserTypeSelected={this.setUserType} onCompanySelected={this.setCompanyId} /> } */}
                {sessionStorage.getItem("userType") == UserType.ADMIN.valueOf() && <div>
                    User type:&nbsp;&nbsp;
                    <select name="userTypeSelect" onChange={this.setUserType}>
                        <option defaultValue = {this.state.userType} key="defaultValue">
                            {this.state.userType}
                        </option>
                        {this.userTypes.filter(userType => userType != this.state.userType).map((userType, index) => (<option value={userType} key={index}>{userType}</option>))}
                    </select>
                </div>}
                {this.state.userType === UserType.COMPANY && <div>
                    Company:&nbsp;
                    <select name="Company select" onChange={this.setCompanyId}>
                        <option defaultValue = {this.state.companyId === undefined? 0 : this.state.companyId} key="defaultCompany">
                            {this.state.companyName === null? "-- Select company --" : this.state.companyName}
                        </option>
                        {this.state.companies.filter(company => company.name !== this.state.companyName).map((company, index) => (
                            <option value={company.id} key={index}>
                                {company.name}
                            </option>))}
                    </select>
                </div>}
                <br />
                <input type="button" value="Edit" onClick={this.edit} />
            </div>
        );
    }

}


