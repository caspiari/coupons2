import { Component, ChangeEvent } from 'react';
import axios from "axios";
import "./Register.css";
import { User } from '../../models/User';
import { UserType } from '../../models/enums/UserType';
import { Company } from '../../models/Company';
import IfAdmin from './ifAdmin/IfAdmin';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import Home from '../home/Home';

interface RegisterUserState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    companyId?: number;
    companies: Company[];
}

export default class RegisterUser extends Component<any, RegisterUserState> {

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public constructor(props: any) {
        super(props);
        this.state = { username: "", password: "", firstName: "", lastName: "", userType: UserType.CUSTOMER, companies: [] };
    }

    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        try {
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<Company[]>("http://localhost:8080/companies");
            this.setState({ companies: response.data });
        } catch (err) {
            Home.exceptionTreatment(err, this.props);
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
        if (userType === UserType.COMPANY) {
            store.dispatch({ type: ActionType.IS_COMPANY, payload: true })
        } else {
            store.dispatch({ type: ActionType.IS_COMPANY, payload: false })
        }
        this.setState({ userType });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private register = async () => {
        try {
            let user = new User(null, this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                this.state.userType, this.state.companyId);
            const response = await axios.post<number>("http://localhost:8080/users", user);
            const serverResponse = response.data;
            alert("Successful registration! Your user id is: " + serverResponse);
            store.dispatch({ type: ActionType.IS_COMPANY, payload: false })
            this.props.history.goBack();
        }
        catch (err) {
            Home.exceptionTreatment(err, this.props);
        }
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="register">
                <h1>Register new user</h1>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin userTypes={this.userTypes} setUserType={this.setUserType}
                    setCompanyId={this.setCompanyId} companies={this.state.companies} />}
                <br />
                <input type="button" value="Register" onClick={this.register} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


