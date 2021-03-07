import { Component, ChangeEvent } from 'react';
import axios from "axios";
import "../Update.css";
import { User } from '../../../models/User';
import { UserType } from '../../../models/UserType';
import { Company } from '../../../models/Company';
import IfAdmin from './ifAdmin/IfAdmin';
import { ActionType } from '../../../redux/action-type';
import { store } from '../../../redux/store';

interface IUpdateUserProps {
    companies: Company[];
    user: User;
}

interface IUpdateUserState {
}

export default class UpdateUser extends Component<IUpdateUserProps, IUpdateUserState> {

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];

    public constructor(props: any) {
        super(props);
        // this.state = { user: this.props.location.state.user, companies: [] };
    }

    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        // const userId = this.props.match.params.id;
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get<User>("http://localhost:8080/users/" + this.props.user.id);
            let newState = { ...this.state };
            // const companiesResponse = await axios.get<Company[]>("http://localhost:8080/companies");
            // newState.companies = companiesResponse.data;
            if (response.data.userType === UserType.COMPANY) {
                store.dispatch({ type: ActionType.CHANGE_IS_COMPANY, payload: true })
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
        if (userType === UserType.COMPANY) {
            store.dispatch({ type: ActionType.CHANGE_IS_COMPANY, payload: true })
        } else {
            store.dispatch({ type: ActionType.CHANGE_IS_COMPANY, payload: false })
        }
        this.setState({ userType });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private update = async () => {
        try {
            let user = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                this.state.userType, this.state.userId, this.state.companyId);
            await axios.put("http://localhost:8080/users", user);
            alert("Successfuly updated!");
            store.dispatch({ type: ActionType.CHANGE_IS_COMPANY, payload: false })
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
            <div className="update">
                <h1>Update user (Id: {this.state.userId})</h1>
                User name: <input type="text" name="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin userTypes={this.userTypes} companies={this.state.companies} 
                 userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Edit" onClick={this.update} />
            </div>
        );
    }

}


