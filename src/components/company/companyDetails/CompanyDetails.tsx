import axios from 'axios';
import { Component } from 'react'
import { Company } from '../../../models/Company';
import "./CompanyDetails.css";

interface ICompanyDetailsState {
    company: Company;
}

export default class CompanyDetails extends Component<any, ICompanyDetailsState> {

    constructor(props: any) {
        super(props);
        const company = new Company(this.props.location.state.id, this.props.location.state.name, this.props.location.state.address, this.props.location.state.phone);
        this.state = { company };
    }

    private delete = async () => {
        if (window.confirm("Do you want to delete this company?") === true) {
            try {
                await axios.delete("http://localhost:8080/companys/" + this.state.company.id);
                alert("company was successfuly deleted");
                this.props.history.goBack();
            } catch (err) {
                if (err.response != null) {
                    let errorMessage: string = err.response.data.errorMessage;
                    alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
                } else {
                    console.log(JSON.stringify(err.data))
                }
            }
        }
    }

    private editcompany = () => {
        this.props.history.push({
            pathname: '/updateCompany',
            state: {
                id: this.state.company.id,
                name: this.state.company.name,
                address: this.state.company.address,
                phone: this.state.company.phone
            }
        });
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="companyDetails">
                <br /><h3>Company details:</h3><br />
        Id: {this.state.company.id}<br />
        Name: {this.state.company.name}<br />
        Address: {this.state.company.address}<br />
        Phone: {this.state.company.phone}<br />
                <br /><br />
                <input type="button" value="Edit" onClick={this.editcompany} />
                {sessionStorage.getItem("companyType") === "ADMIN" && <input type="button" value="Delete" onClick={this.delete} />}
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }
}
