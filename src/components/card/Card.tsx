import axios from 'axios';
import { Component } from 'react';

interface ICardProps {
    id : number;
    name : string;
    amount ?: number;
    price ?: number;
}

export default class Card extends Component<ICardProps> {

    public constructor(props: ICardProps) {
        super(props);
    }

      // componentDidMount = ngOnInit in angular (a reserved word)
  public async componentDidMount() {
    try {
      const response = await axios.get<Coupon[]>("http://localhost:8080/coupons");
      // response.data = all the coupons that were returned from the server
      this.setState({ coupons: response.data });
    } catch (err) {
      console.log(err.message);
    }
  }

    public render() {
        return (
            <div className = "card">
            {`ID: ${this.props.id}`}
            <br/>
            {`Name: ${this.props.name}`}
            <br/>
            {`Amount: ${this.props.amount}`}
            <br/>
            {`Price: ${this.props.price}`}
            </div>
        )
    }
}

