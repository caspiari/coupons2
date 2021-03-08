import { Component } from 'react'
import "./UsersManagement.css"
import { NavLink } from 'react-router-dom';
import { User } from '../../../models/User';
import axios from 'axios';
import { MouseEventHandler } from 'react';
import { ChangeEvent } from 'react';
import { UserType } from '../../../models/UserType';
import React from 'react';
import UserCard from '../../card/userCard/UserCard';

interface IUsersManagementState {
    userIdFilter: number;
    userNameFilter: string;
    users: User[];
    selectedUser: User;
}

export default class UsersManagement extends Component<any, IUsersManagementState> {
   
    constructor(props: any) {
        super(props);
        this.state = {userIdFilter: 0, userNameFilter: "", users: [], selectedUser: new User("", "", "", "", null,) };
    }

    public async componentDidMount() {
        try {
            const token = sessionStorage.getItem("token");
            if(token == null) {
                alert("Please login");
                this.props.history.push('/home');
            }
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.get<User[]>("http://localhost:8080/users");
            const users = response.data;
            this.setState({ users });
        } catch (err) {
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            }
        }
    }

    public onUserNamePipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userNameFilter = event.target.value;
        this.setState({ userNameFilter });
    }

    public onUserIdPipeChanged = (event: ChangeEvent<HTMLInputElement>) => {
        let userIdFilter = +event.target.value;
        this.setState({ userIdFilter });
    }

    private onUserSelect = (event) => {
        console.log(JSON.stringify(event));
        // const selectedUser = this.state.users.find(user => user.id === +event.target.);
        // this.setState({ selectedUser });
    }

    private editUser = () => {
        this.props.history.push({
            pathname: '/updateUser',
            state: {
                username: this.state.selectedUser.username,
                password: this.state.selectedUser.password,
                firstName: this.state.selectedUser.firstName,
                lastName: this.state.selectedUser.lastName,
                userType: this.state.selectedUser.userType,
                companyId: this.state.selectedUser.companyId,
                id: this.state.selectedUser.id
            }
        });
    }

    private user = new User("aaa", "aaa", "aaa", "aaa", UserType.ADMIN);

    public render() {
        return (
            <div className="admin">
                <br />
                <h3>Users management</h3>
                <br />
                <NavLink to={"/registerUser"}>Register new user</NavLink><br /><br />

                {this.state.users.map(user => <UserCard                )}
                
                {/* Update user details:&nbsp;&nbsp;
                <select name="userIdSelect" onChange={this.onUserSelect}>
                    <option defaultValue={+sessionStorage.getItem("id")} key="default">-- Select user --</option>
                    {this.state.users.map((user, index) => (<option value={user.id} key={index}>{user.username}</option>))}
                </select>&nbsp; */}
                <input type="button" value="Edit" onClick={this.editUser} />
            </div>
        );
    }
}
