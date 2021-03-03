import { Component, ChangeEvent } from 'react';
import axios from "axios";
import "../Register.css";
import { Company } from '../../../models/Company';

interface RegisterState {
    name: string;
    address: string;
    phone: string;
}

export default class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = { name: "", address: "", phone: null };
    }

    private setName = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        this.setState({ name });
    }

    private setAddress = (event: ChangeEvent<HTMLInputElement>) => {
        const address = event.target.value;
        this.setState({ address });
    }

    private setPhone = (event: ChangeEvent<HTMLInputElement>) => {
        const phone = event.target.value;
        this.setState({ phone });
    }

    private register = async () => {
        try {
            let company = new Company(this.state.name, this.state.address, this.state.phone);
            const response = await axios.post<number>("http://localhost:8080/companies", company);
            const serverResponse = response.data;
            alert("Successful registration! Company id is: " + serverResponse);
            this.props.history.goBack();
        }
        catch (err) {
            alert(err.response.data.errorMessage);
        }
    }

    public render() {
        return (
            <div className="register">
                <h1>Register new company</h1>
                Name: <input type="text" name="name" value={this.state.name} onChange={this.setName} /><br />
                Address: <input type="text" name="address" value={this.state.address} onChange={this.setAddress} /><br />
                Phone: <input type="number" name="phone" value={this.state.phone} onChange={this.setPhone} /><br />
                <br />
                <input type="button" value="register" onClick={this.register} />
            </div>
        );
    }

}


