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
import Home from '../../home/Home';

interface IUpdateUserProps {
    user: User;
    setEditMode: any;
}

interface IUpdateUserState {
    companies: Company[];
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    companyId?: number;
}

export default class UpdateUser extends Component<IUpdateUserProps, IUpdateUserState> {

    public constructor(props: IUpdateUserProps) {
        super(props);
        this.state = { companies: [], username: this.props.user.username, password: this.props.user.password, firstName: this.props.user.firstName, 
            lastName: this.props.user.lastName, userType: this.props.user.userType, companyId: this.props.user.companyId };
    }

    private userTypes: UserType[] = [UserType.ADMIN, UserType.COMPANY, UserType.CUSTOMER];
    
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

    private onEditClick = async () => {
        try {
            const user = new User(this.props.user.id, this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.userType, this.state.companyId);
            await axios.put("http://localhost:8080/users", user);
            alert("User successfuly updated!");
            store.dispatch({ type: ActionType.IS_COMPANY, payload: false })
            this.props.setEditMode(true);
        }
        catch (err) {
            Home.exceptionTreatment(err, this.props);
        }
    }

    private onCloseClick = () => {
        this.props.setEditMode(false);
    }

    public render() {
        return (
            <div className="update">
                <h2>Update user: Id: {this.props.user.id}</h2>
                <label htmlFor="username">User name:</label>
                <input type="text" name="username" id="username" placeholder="E-mail" value={this.state.username} onChange={this.setUsername} /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.setPassword} /><br />
                <label htmlFor="firstName">First name:</label>
                <input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin key={"ifAdmin"} userTypes={this.userTypes} companies={this.state.companies}
                    userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />}
                <br />
                <input type="button" value="Edit" onClick={this.onEditClick} />
                <input type="button" value="Close" onClick={this.onCloseClick} /><br /><br />
            </div>
        );
    }

}


