import axios from 'axios';
import { ChangeEvent, Component } from 'react'
import { Company } from '../../../models/Company';
import { Coupon } from '../../../models/Coupon';
import { CouponType } from '../../../models/enums/CouponType';
import Home from '../../home/Home';
import "./CreateCoupon.css";

interface ICreateCouponState {
  category: CouponType;
  name: string;
  description: string;
  price: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  companyId?: number;
  companies?: Company[];
}

export default class CreateCoupon extends Component<any, ICreateCouponState> {

  constructor(props: any) {
    super(props);
    this.state = { category: null, name: "", description: "", price: 0, amount: 0, startDate: new Date(), endDate: new Date() };
  }

  private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];

  public async componentDidMount() {
    try {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (sessionStorage.getItem("userType") === "ADMIN") {
        const response = await axios.get<Company[]>("http://localhost:8080/companies");
        this.setState({ companies: response.data });
      }
    } catch (err) {
      Home.exceptionTreatment(err, this.props);
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

  public onCreateClick = async () => {
    const coupon = new Coupon(null, this.state.category, this.state.name, this.state.companyId, this.state.description, this.state.price,
      this.state.amount, this.state.startDate, this.state.endDate);
    try {
      const response = await axios.post<number>("http://localhost:8080/coupons", coupon);
      alert("Coupon successfuly created! Id: " + response.data);
      this.props.history.goBack();
    }
    catch (err) {
      // console.log(JSON.stringify(err), err.message);
      Home.exceptionTreatment(err, this.props);
    }
  }

  private onBackClick = () => {
    this.props.history.goBack();
  }

  public render() {
    return (
      <div className="createCoupon">
        <br />
        <h2>Create coupon</h2>
        {sessionStorage.getItem("userType") === "ADMIN" && <div>Company:&nbsp;{/* For company-user the company id gets picked automaticly in server */}
          <select name="company select" onChange={this.setCompanyId}>
            <option defaultValue="" key="default company">
              -- Select company --
            </option>
            {this.state.companies.map((Company, index) => (<option value={Company.id} key={index}>{Company.name}</option>))}
          </select>
        </div>}
        Category: <select name="coupon type select" onChange={this.setCategory}>
          <option defaultValue="" key="defaultValue">
            -- Select category --
          </option>
          {this.couponTypes.map((couponType, index) => (<option value={couponType} key={index}>{couponType.valueOf()}</option>))}
        </select><br />
        Name: <input type="text" name="name" value={this.state.name} onChange={this.setName} /><br />
        Description: <input type="text" name="description" value={this.state.description} onChange={this.setDescription} /><br />
        Price: <input type="number" name="price" value={this.state.price} onChange={this.setPrice} /><br />
        Amount in stock: <input type="text" name="amount" value={this.state.amount} onChange={this.setAmount} /><br />
        Start date: <input type="date" name="startDate" placeholder="Start date" onChange={this.setStartDate} /><br />
        End date: <input type="date" name="endDate" placeholder="End date" onChange={this.setEndDate} />
        <br />
        <input type="button" value="Create" onClick={this.onCreateClick} />
        <input type="button" value="Back" onClick={this.onBackClick} />
      </div>
    );
  }
}
