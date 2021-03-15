import { Component } from 'react'
import "./Admin.css"

export default class Admin extends Component<any> {

private onUsersManagementClick = () => {
    this.props.history.push("/usersManagement");
}

private onCompaniesManagementClick = () => {
    this.props.history.push("/registerCompany");
}

    public render() {
        return (
            <div className="admin">
                <br />
                <h2>Hello admin</h2><br />
                <br /><input type="button" value="Users management" onClick={this.onUsersManagementClick} />
                <br /><input type="button" value="Companies management" onClick={this.onCompaniesManagementClick} />
            </div>
        );
    }
}
