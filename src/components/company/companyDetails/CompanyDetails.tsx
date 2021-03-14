import axios from 'axios';
import { Component } from 'react'
import { Company } from '../../../models/Company';
import Home from '../../home/Home';
import "./CompanyDetails.css";

interface ICompanyDetailsProps {
    company: Company;
    setShowDetails: any;
    setEditMode: any;
}

export default class CompanyDetails extends Component<ICompanyDetailsProps> {

    constructor(props: ICompanyDetailsProps) {
        super(props);
    }

    private onEditClick = () => {
        this.props.setEditMode(true);
    }

    private onDeleteClick = async () => {
        if (window.confirm("Do you want to delete this company?") === true) {
            try {
                await axios.delete("http://localhost:8080/companys/" + this.props.company.id);
                alert("company was successfuly deleted");
                this.props.setShowDetails(false);
            } catch (err) {
                Home.exceptionTreatment(err);
            }
        }
    }

    private onCloseClick = () => {
        this.props.setShowDetails(false);
    }

    public render() {
        return (
            <div className="userDetails">
            <h3><br />Company details:<br />
            Id: {this.props.company.id}<br />
            Name: {this.props.company.name}<br />
            Address: {this.props.company.address}<br />
            Phone: {this.props.company.phone}<br />
            </h3><br /><br />
            <input type="button" value="Edit" onClick={this.onEditClick} />
            {sessionStorage.getItem("userType") === "ADMIN" && <input type="button" value="Delete" onClick={this.onDeleteClick} />}
            <input type="button" value="Close" onClick={this.onCloseClick} /><br /><br />
            </div>
        );
    }

}
