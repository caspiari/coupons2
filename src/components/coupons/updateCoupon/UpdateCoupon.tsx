import { Component } from 'react';
import axios from "axios";
import "./UpdateCoupon.css";
import { ChangeEvent } from 'react';
import { CouponType } from '../../../models/enums/CouponType';
import { Coupon } from '../../../models/Coupon';
import "react-datepicker/dist/react-datepicker.css";
import Home from '../../home/Home';
import { Company } from '../../../models/Company';

interface IUpdateCouponProps {
    coupon: Coupon;
    setEditMode: any;
}

interface IUpdateCouponState {
    id: number;
    companyName: string;
    category: CouponType;
    name: string;
    description: string;
    price: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    companyId: number;
    companies: Company[];
}

export default class UpdateCoupon extends Component<IUpdateCouponProps, IUpdateCouponState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.coupon.id, companyName: this.props.coupon.companyName, category: this.props.coupon.category, name: this.props.coupon.name,
            description: this.props.coupon.description, price: this.props.coupon.price, amount: this.props.coupon.amount, startDate: this.props.coupon.startDate,
            endDate: this.props.coupon.endDate, companyId: this.props.coupon.companyId, companies: []
        };
    }

    private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];
    
    public async componentDidMount() {
        if (sessionStorage.getItem("userType") === "ADMIN") {
            const token = sessionStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            try {
                const response = await axios.get<Company[]>("http://localhost:8080/companies");
                const companies = response.data;
                this.setState({ companies });
            } catch (err) {
                Home.exceptionTreatment(err, this.props);
            }
        }
    }

    private setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value as CouponType;
        this.setState({ category });
    }

    private setName = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        this.setState({ name });
    }

    private setDescription = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        this.setState({ description });
    }

    private setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        const price = +event.target.value;
        this.setState({ price });
    }

    private setAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = +event.target.value;
        this.setState({ amount });
    }

    private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        const startDate = new Date(event.target.value);
        this.setState({ startDate });
    }

    private setEndDate = (event: ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(event.target.value);
        this.setState({ endDate });
    }

    private setCompanyId = (event: ChangeEvent<HTMLSelectElement>) => {
        const companyId = +event.target.value;
        this.setState({ companyId });
    }

    private update = async () => {
        const coupon = new Coupon(this.state.id, this.state.category, this.state.name, this.state.companyId,
            this.state.description, this.state.price, this.state.amount, this.state.startDate, this.state.endDate);
        try {
            await axios.put("http://localhost:8080/coupons", coupon);
            alert("Successfuly updated!");
            this.props.setEditMode(true);
        }
        catch (err) {
            Home.exceptionTreatment(err, this.props);
        }
    }

    private onBackClick = () => {
        this.props.setEditMode(false);
    }

    public render() {
        return (
            <div className="updateCoupon">
                <h2><u>Update coupon: Id: {this.state.id}</u></h2>
                {sessionStorage.getItem("userType") === "ADMIN" && <div>Company:&nbsp;{/* For company-user the company id gets picked automaticly in server */}
                    <select name="company select" onChange={this.setCompanyId}>
                        <option defaultValue="" key="default company">
                            -- Select company --
                        </option>
                        {this.state.companies.map((Company, index) => (<option value={Company.id} key={index}>{Company.name}</option>))}
                    </select>
                </div>}
                Category: <select name="coupon type select" onChange={this.setCategory}>
                <option defaultValue={this.props.coupon.category} key="defaultValue">
                    {this.props.coupon.category}
                </option>
                {this.couponTypes.map((couponType, index) => (<option value={couponType} key={index}> {couponType.valueOf()} </option>))}
                </select><br />
                Name: <input type="text" name="name" value={this.state.name} onChange={this.setName} /><br />
                Description: <input type="text" name="description" value={this.state.description} onChange={this.setDescription} /><br />
                Price: <input type="number" name="price" value={this.state.price} onChange={this.setPrice} /><br />
                Amount in stock: <input type="text" name="amount" value={this.state.amount} onChange={this.setAmount} /><br />
                Start date: <input type="date" name="startDate" placeholder="Start date" onChange={this.setStartDate} /><br />
                End date: <input type="date" name="endDate" placeholder="End date" onChange={this.setEndDate} />
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.onBackClick} />
            </div>
        );
    }

}


