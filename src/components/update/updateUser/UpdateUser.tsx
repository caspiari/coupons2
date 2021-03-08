import { Component } from 'react';
import axios from "axios";
import "../Update.css";
import { UserType } from '../../../models/UserType';
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
    id?: number;
}

export default class UpdateUser extends Component<any, IUpdateUserState> {

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public constructor(props: any) {
        super(props);
        this.state = { companies: [], username: this.props.location.state.username, password: this.props.location.state.password, firstName: this.props.location.state.firstName,
                       lastName: this.props.location.state.lastName, userType: this.props.location.state.userType, companyId: this.props.location.state.companyId, id: this.props.location.state.id };
    }

    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get<Company[]>("http://localhost:8080/companies");
            let newState = {...this.state};
            newState.companies = response.data;
            console.log(newState.companies);
            this.setState(newState);
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
        this.setState({ lastName });    }

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
            const user = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.userType, this.state.id, this.state.companyId);
            await axios.put("http://localhost:8080/users", user);
            alert("Successfuly updated!");
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
                <h3>Update user [Id: {this.state.id}]</h3>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin userTypes={this.userTypes} companies={this.state.companies} 
                 userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


