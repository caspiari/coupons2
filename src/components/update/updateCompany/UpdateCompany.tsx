import { Component } from 'react';
import axios from "axios";
import "../Update.css";
import { UserType } from '../../../models/enums/UserType';
import { ActionType } from '../../../redux/action-type';
import { store } from '../../../redux/store';
import { User } from '../../../models/User';
import { ChangeEvent } from 'react';
import { Company } from '../../../models/Company';

interface IUpdateCompanyState {
    id:number,
    name:string,
    address: string,
    phone:string
}

export default class UpdateCompany extends Component<any, IUpdateCompanyState> {

    public constructor(props: any) {
        super(props);
        this.state = { id: this.props.location.state.id, name: this.props.location.state.name, address: this.props.location.state.address, phone: this.props.location.state.phone };
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

    private update = async () => {
        try {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const company = new Company(this.state.id, this.state.name, this.state.address, this.state.phone);
            await axios.put("http://localhost:8080/companies", company);
            alert("Successfuly updated!");
            this.props.history.goBack();
        }
        catch (err) {
            console.log(err.message);
            if (err.response != null) {
                let errorMessage: string = err.response.data.errorMessage;
                alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
            } else {
                console.log(JSON.stringify(err))
            }
        }
    }

    private back = () => {
        this.props.history.goBack();
    }

    public render() {
        return (
            <div className="update">
                <h3>Update company [Id: {this.state.id}]</h3>
                Name: <input type="text" name="name" placeholder={this.state.name} value={this.state.name} onChange={this.setName} /><br />
                {/* Password:&nbsp; <input type="password" name="password" value={this.state.password} onChange={this.setPassword} /><br />
                First name: <input type="text" name="firstName" value={this.state.firstName} onChange={this.setFirstName} /><br />
                Last name: <input type="text" name="lastName" value={this.state.lastName} onChange={this.setLastName} /><br />
                {sessionStorage.getItem("userType") === UserType.ADMIN.valueOf() && <IfAdmin userTypes={this.userTypes} companies={this.state.companies} 
                 userType={this.state.userType} companyId={this.state.companyId} setUserType={this.setUserType} setCompanyId={this.setCompanyId} />} */}
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


