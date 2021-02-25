// import { Component, ChangeEvent } from 'react'
import React, { Component, ChangeEvent } from 'react';
import "./Register.css";

interface ForAdminProps {
    userTypes: string[];
    onOptionSelected: any;
}

export default class ForAdmin extends Component<ForAdminProps> { 

    public constructor(props: any) {
        super(props);
    }

    public async componentDidMount() {
        const newState = { ...this.state };

        this.setState(newState);
    }

    private setId = (event: ChangeEvent<HTMLInputElement>) => {
        const id = +event.target.value;
        this.setState({ id });
    }

    public render() {
        return (
            <div className="register">
                User type: <select name="userTypeSelect" onChange={this.props.onOptionSelected} 
                                defaultValue={this.props.userTypes[0]}>
                                    {this.props.userTypes.map((userType, index) => (<option value={userType} key={index}>{userType}</option>))}
                            </select>
                {/* Company id: <input type="number" name="companyId" onChange={this.setCompanyId} /> */}
            </div>
        );
    }

}