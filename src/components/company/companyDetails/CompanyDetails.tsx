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
        this.state = { company: new Company() };
    }

    public async componentDidMount() {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const id = this.props.match.params;
        try {
            const response = await axios.get<Company>("http://localhost:8080/companies/" + id);
            const company = response.data;
            this.setState({ company });
        } catch (err) {
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            } else {
                console.log(JSON.stringify(err))
            }
        }
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
                <input type="button" value="Edit" onClick={this.props.history.push('/updateCompany' + this.state.company.id)} />
                {sessionStorage.getItem("companyType") === "ADMIN" && <input type="button" value="Delete" onClick={this.delete} />}
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }
}
