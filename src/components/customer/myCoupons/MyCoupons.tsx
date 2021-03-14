import axios from 'axios';
import React from 'react';
import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Coupon } from '../../../models/Coupon';
import { CouponType } from '../../../models/enums/CouponType';
import { store } from '../../../redux/store';
import Card from '../../card/Card';
import Home from '../../home/Home';
import './MyCoupons.css';

interface IMyCouponsState {
  coupons: Coupon[];
  nameFilter: string;
  companyFilter: string;
  categoryFilter: string;
}

export default class MyCoupons extends Component<any, IMyCouponsState> {

  private unsubscribeStore: Unsubscribe;
  private couponTypes: CouponType[] = [CouponType.COMPUTERS, CouponType.KITCHEN, CouponType.STEREO];

  constructor(props: any) {
    super(props);
    this.state = { coupons: [], nameFilter: "", companyFilter: "", categoryFilter: "" };
  }

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState({})
    );
    const id = +sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get<Coupon[]>("http://localhost:8080/coupons/byUserId/?id=" + id);
      this.setState({ coupons: response.data });
    } catch (err) {
      console.log(err.message);
      Home.exceptionTreatment(err, this.props);
    }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public onNamePipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ nameFilter: text });
  }

  public onCompanyPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ companyFilter: text });
  }

  public onCategoryPipeChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let categoryFilter = event.target.value.valueOf();
    this.setState({ categoryFilter });
  }

  private onCardClick = (id: number) => {
    this.props.history.push('/couponDetails/' + id);
  }

  public render() {
    return (
      <div className="myCoupons">
        <br />
        <h2>My purchased coupons:</h2><br />
        Search by name: <input type="text" onChange={this.onNamePipeChanged} /> &nbsp;&nbsp;
        Search by company: <input type="text" onChange={this.onCompanyPipeChanged} />
        {<ol>
          {this.state.coupons.filter(coupon => coupon.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))
          .filter(coupon => coupon.companyName.toLowerCase().includes(this.state.companyFilter))
          .filter(coupon => coupon.category.valueOf().includes(this.state.categoryFilter))
          .map(coupon => <Card key={coupon.id} coupon={coupon} onCardClick={() => this.onCardClick(coupon.id)} />)}
        </ol>}
      </div>
    );
  }
}
