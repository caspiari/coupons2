import { Component, ChangeEvent, PropsWithChildren } from 'react';
import axios from "axios";
import "./Register.css";
import { User } from '../../models/User';
import { UserType } from '../../models/UserType';
import { Company } from '../../models/Company';

interface IEditUserState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    companyId?: number;
    companies: Company[];
    userId: number;
}

export default class EditUser extends Component<any, IEditUserState> {

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];
    private token = sessionStorage.getItem("token");
    private userId: number = this.props.match.params.id;

    public constructor(props: any) {
        super(props);
        this.state = { username: "", password: "", firstName: "", lastName: "", userType: null, companies: [], userId: 0 };
    }

    public async componentDidMount() {
        try {
            axios.defaults.headers.common["Authorization"] = this.token;
            const userResponse = await axios.get<User>("http://localhost:8080/users/" + this.userId);
            let newState = {...this.state};
            newState.username = userResponse.data.username;
            newState.password = userResponse.data.password;
            newState.firstName = userResponse.data.firstName;
            newState.lastName = userResponse.data.lastName;
            newState.userType = userResponse.data.userType as UserType;
            this.setState(newState);

            const response = await axios.get<Company[]>("http://localhost:8080/companies");
            this.setState({ companies: response.data });
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
                <h1>Register new user</h1>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {/* //  <ForAdmin userTypes={['CUSTOMER', 'COMPANY', 'ADMIN']} onUserTypeSelected={this.setUserType} onCompanySelected={this.setCompanyId} /> } */}
                {sessionStorage.getItem("userType") == UserType.ADMIN.valueOf() && <div>
                    User type:&nbsp;&nbsp;
                    <select name="userTypeSelect" onChange={this.setUserType}>
                        <option disabled selected key="default">
                            -- select user type --
                        </option>
                        {this.userTypes.map((userType, index) => (<option value={userType} key={index}>{userType}</option>))}
                    </select>
                </div>}
                {this.state.userType === UserType.COMPANY && <div>
                    Company:&nbsp;
                    <select name="companySelect" onChange={this.setCompanyId}>
                        <option disabled selected key="default">
                            -- select company --
                        </option>
                        {this.state.companies.map((Company, index) => (
                            <option value={Company.id} key={index}>
                                {Company.name}
                            </option>))}
                    </select>
                </div>}
                <br />
                <input type="button" value="register" onClick={this.register} />
            </div>
        );
    }

}


