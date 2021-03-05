// import { Component, ChangeEvent } from 'react'
import axios from 'axios';
import React, { Component, ChangeEvent } from 'react';
import { Company } from '../../../models/Company';
import "../Register.css";

interface ForAdminProps {
    userTypes: string[];
    onUserTypeSelected: any;
    onCompanySelected: any;
}

interface ForAdminState {
    companies: Company[];
}

export default class ForAdmin extends Component<ForAdminProps, ForAdminState> {

    public constructor(props: any) {
        super(props);
        this.state = { companies: [] }
    }

    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        try {
            const response = await axios.get<Company[]>("http://localhost:8080/companies");
            const companies = response.data;
            this.setState({ companies });
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    }

    public render() {
        return (
            <div className="register">
            User type:&nbsp; <select name="userTypeSelect" onChange={this.props.onUserTypeSelected}>
                                <option disabled selected key="default">
                                  -- select user type --
                                </option>
                  {this.props.userTypes.map((userType, index) => (
                   <option value={userType} key={index}>{userType}</option>))}
                </select>
                        <br/ >
            {this.props.onUserTypeSelected.}
            Company:&nbsp; <select name="companySelect" onChange={this.props.onCompanySelected}>
                        <option disabled selected key="default">
                            -- select company --
                        </option>
                            {this.state.companies.map((Company, index) => (
                        <option value={Company.id} key={index}>
                            {Company.name}
                        </option>))}
                    </select>
            </div>
        );
    }

}