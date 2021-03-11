import { Component } from 'react';
import axios from "axios";
import "../Update.css";
import { ChangeEvent } from 'react';
import { CouponType } from '../../../models/enums/CouponType';
import { Coupon } from '../../../models/Coupon';
import "react-datepicker/dist/react-datepicker.css";

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
}

export default class UpdateCoupon extends Component<any, IUpdateCouponState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.location.state.id, companyName: "", category: null, name: "", description: "",
            price: 0, amount: 0, startDate: null, endDate: null, companyId: 0
        };
    }

    private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];

    // public async componentDidMount() {
    //     const token = sessionStorage.getItem("token");
    //     axios.defaults.headers.common["Authorization"] = token;
    //     try {
    //         const response = await axios.get<Company[]>("http://localhost:8080/companies");
    //         const companies = response.data;
    //         this.setState({ companies });
    //     } catch (err) {
    //         console.log(err.message);
    //         if (err.response != null) {
    //             let errorMessage: string = err.response.data.errorMessage;
    //             alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
    //         } else {
    //             console.log(JSON.stringify(err))
    //         }
    //     }
    // }

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

    private setStartDate = (date) => {
        // const startDate = date;
        // this.setState({ startDate });
        // this.date = date;
        // console.log(date);
    }

    private setEndDate = (date) => {
        const endDate = date;
        this.setState({ endDate });
    }

    private update = async () => {
        const coupon = new Coupon(this.state.id, this.state.category, this.state.name, this.state.companyId, 
            this.state.description, this.state.price, this.state.amount, this.state.startDate, this.state.endDate);
        try {
            await axios.put("http://localhost:8080/coupons", coupon);
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

    // private date = new Date(+this.state.startDate.getFullYear, +this.state.startDate.getMonth, +this.state.startDate.getDate);

    public render() {
        return (
            <div className="updateCoupon">
                <h3>Update coupon [Id: {this.state.id}]</h3>
                Category:
                <select name="coupon type select" onChange={this.setCategory}>
                    <option defaultValue={this.state.category} key="defaultValue">
                        {this.state.category}
                    </option>
                    {this.couponTypes.filter(couponType => couponType !== this.state.category).map((couponType, index) => (
                        <option value={couponType} key={index}>{couponType.valueOf()}</option>))}
                </select><br />
                Name:&nbsp; <input type="text" name="name" value={this.state.name} onChange={this.setName} /><br />
                Description: <input type="text" name="description" value={this.state.description} onChange={this.setDescription} /><br />
                Price: <input type="number" name="price" value={this.state.price} onChange={this.setPrice} /><br />
                Amoun in stock: <input type="text" name="amount" value={this.state.amount} onChange={this.setAmount} /><br />
                Price: <input type="number" name="price" value={this.state.price} onChange={this.setPrice} /><br />
                {/* Start date: <DatePicker value={Card.formatTime(this.date)} selected={this.date} onChange={date => this.setStartDate(date)} name="startDate" dateFormat="DD/MM/YYYY" />
                End date: <DatePicker value={Card.formatTime(this.date)} selected={ this.date } onChange={date => this.setEndDate(date)} name="endDate" dateFormat="MM-DD-YYYY" /> */}
                <br />
                <input type="button" value="Update" onClick={this.update} />
                <input type="button" value="Back" onClick={this.back} />
            </div>
        );
    }

}


