import { Component } from 'react'
import "./UsersManagement.css"
import { NavLink } from 'react-router-dom';
import { User } from '../../../models/User';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { UserType } from '../../../models/UserType';
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
            } else {
                console.log(JSON.stringify(err))
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

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="admin">
                <br />
                <h3>Users management</h3>
                <NavLink to={"/registerUser"}>Register new user</NavLink><br /><br />
                <br />

                {this.state.users.map(user => <UserCard key={user.id} user={user} />)}
              
                <br /><input type="button" value="Back" onClick={this.back} />

            </div>
        );
    }
}
