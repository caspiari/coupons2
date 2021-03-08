import { Component } from 'react'
import "./Admin.css"
import { NavLink } from 'react-router-dom';
import { User } from '../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';

interface IAdminState {
    users: User[];
}

export default class Admin extends Component<any, IAdminState> {

    private selectedUser: User;

    constructor(props: any) {
        super(props);
        this.state = { users: [] };
    }

    public async componentDidMount() {
        try {
            let newState = { ...this.state };
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<User[]>("http://localhost:8080/users");
            newState.users = response.data;
            // this.selectedUserId = newState.users[0].id;
            this.setState(newState);
        } catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            }
        }
    }

    private onUserSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        this.selectedUser = this.state.users.find(user => user.id === +event.target.value);
    }

    private editUser = () => {
        this.props.history.push({
            pathname: '/updateUser',
            state: {
                username: this.selectedUser.username,
                password: this.selectedUser.password,
                firstName: this.selectedUser.firstName,
                lastName: this.selectedUser.lastName,
                userType: this.selectedUser.userType,
                companyId: this.selectedUser.companyId,
                id: this.selectedUser.id
            }
        });
    }

    public render() {
        return (
            <div className="admin">
                <br />
                <h5>Admin page</h5><br />
                <NavLink to={"/registerUser"}>Register new user</NavLink><br /><br />
                <NavLink to={"/registerCompany"}>Register new company</NavLink><br /><br />
                Update user details:&nbsp;&nbsp;
                <select name="userIdSelect" onChange={this.onUserSelect}>
                    <option defaultValue={+sessionStorage.getItem("id")} key="default">-- Select user --</option>
                    {this.state.users.map((user, index) => (<option value={user.id} key={index}>{user.username}</option>))}
                </select>&nbsp;
                <input type="button" value="Edit" onClick={this.editUser} />
            </div>
        );
    }
}
