import axios from 'axios';
import { Component } from 'react'
import { Card } from '../../models/Card';
import Card from '../card/Card';
import "./Coupons.css";

interface CouponsState {
  cards: Card[];
  companyNameFilter: string;
}

export default class Coupons extends Component<any, CouponsState> {

  constructor(props: any) {
    super(props);
    this.state = { cards: [], companyNameFilter: "" };
  }

  // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    try {
      const response = await axios.get<Card[]>("http://localhost:8080/coupons");
      // response.data = all the coupons that were returned from the server
      this.setState({ cards: response.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  public onCouponsPipeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ companyNameFilter: text });
  }

  public render() {
    return (
      <div className="Coupons">
        Search by name :<input type="text" onChange={this.onCouponsPipeChanged} />
        <br></br>
        {<ol>
          {this.state.cards.filter(card => {
            if (this.state.companyNameFilter == "") {
              return true;
            }
            return card.name.includes(this.state.companyNameFilter.toLowerCase())
          }
          ).map(card => <div className="card" key={card.id}><Card id={1} name={'rrrrRR'} />
            
            <h6>Name: {card.name} -- Price: {card.price} -- Amount: {card.amount}</h6></div>)}
        </ol>}
        {/* {this.state.coupons.map(coupon => <div key={coupon.name}><h1>Name: {coupon.name} -- Price: {coupon.price} -- Amount: {coupon.amount}</h1></div>)} */}
        {/* <div className="card">
          <Card id={1} name={'rrrrRR'} /><br />
        </div><div className="card">
          <Card id={2} name={'ggggGG'} /><br />
        </div><div className="card">
          <Card id={3} name={'vvvvvVV'} /><br />
        </div> */}
      </div>
    );
  }
}
