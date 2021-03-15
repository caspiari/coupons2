import { Component } from 'react';
import axios from "axios";
import "./UpdateCompany.css";
import { ChangeEvent } from 'react';
import { Company } from '../../../models/Company';
import Home from '../../home/Home';

interface IUpdateCompanyProps {
    company: Company;
    setEditMode: any;
}

interface IUpdateCompanyState {
    id: number,
    name: string,
    address: string,
    phone: string
}

export default class UpdateCompany extends Component<IUpdateCompanyProps, IUpdateCompanyState> {

    public constructor(props: any) {
        super(props);
        this.state = { id: this.props.company.id, name: this.props.company.name, address: this.props.company.address, 
            phone: this.props.company.phone };
    }

    private setName = (event: ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
        this.setState({ name });
    }

    private setAddress = (event: ChangeEvent<HTMLInputElement>) => {
        let address = event.target.value;
        this.setState({ address });
    }

    private setPhone = (event: ChangeEvent<HTMLInputElement>) => {
        let phone = event.target.value;
        this.setState({ phone });
    }

    private onEditClick = async () => {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const company = new Company(this.state.id, this.state.name, this.state.address, this.state.phone);
            await axios.put("http://localhost:8080/companies", company);
            alert("Successfuly updated!");
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
                <h2>Update company: Id: {this.state.id}</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder={this.state.name} value={this.state.name} onChange={this.setName} /><br />
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" id="address" value={this.state.address} onChange={this.setAddress} /><br />
                <label htmlFor="phone">Phone:</label>
                <input type="numbers" name="phone" value={this.state.phone} onChange={this.setPhone} /><br />
                <br />
                <input type="button" value="Edit" onClick={this.onEditClick} />
                <input type="button" value="Close" onClick={this.onCloseClick} /><br /><br />
            </div>
        );
    }

}


