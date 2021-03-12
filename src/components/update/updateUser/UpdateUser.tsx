import { Component } from 'react';
import axios from "axios";
import "../Update.css";
import { UserType } from '../../../models/enums/UserType';
import { Company } from '../../../models/Company';
import IfAdmin from './ifAdmin/IfAdmin';
import { ActionType } from '../../../redux/action-type';
import { store } from '../../../redux/store';
import { User } from '../../../models/User';
import { ChangeEvent } from 'react';

interface IUpdateUserState {
    companies: Company[];
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    companyId?: number;
}

export default class UpdateUser extends Component<any, IUpdateUserState> {

    public constructor(props: any) {
        super(props);
        this.state = { companies: [], username: "", password: "", firstName: "", lastName: "", userType: null, companyId: 0 };
    }

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];
    
    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get<Company[]>("http://localhost:8080/companies");
            const companies = response.data;
            const userResponse = await axios.get<User>("http://localhost:8080/user/" + this.props.match.params);
            const user = userResponse.data;
            this.setState({ companies, username: user.username, password: user.password, firstName: user.firstName,
            lastName: user.lastName, userType: user.userType, companyId: user.companyId });
        } catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            } else {
                console.log(JSON.stringify(err))
            }
        }
    }

    private setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        let username = event.target.value;
        this.setState({ username });
    }

    private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        let password = event.target.value;
        this.setState({ password });
    }

    private setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        let firstName = event.target.value;
        this.setState({ firstName });
    }

    private setLastName = (event: ChangeEvent<HTMLInputElement>) => {
        let lastName = event.target.value;
        this.setState({ lastName });
    }

    private setUserType = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === UserType.COMPANY) {
            store.dispatch({ type: ActionType.IS_COMPANY, payload: true })
        } else {
            store.dispatch({ type: ActionType.IS_COMPANY, payload: false })
        }
        let userType = event.target.value as UserType;
        this.setState({ userType });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        let companyId = +event.target.value;
        this.setState({ companyId });
    }

    private update = async () => {
        try {
            const user = new User(this.props.match.params, this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.userType, this.state.companyId);
            await axios.put("http://localhost:8080/users", user);
            alert("User successfuly updated!");
            store.dispatch({ type: ActionType.IS_COMPANY, payload: false })
            this.props.history.goBack();
        }
        catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            } else {
                console.log(JSON.stringify(err))
            }
        }
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="update">
                <h3>Update user [Id: {this.props.match.params}]</h3>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin key={"ifAdmin"} userTypes={this.userTypes} companies={this.state.companies}
                    userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


