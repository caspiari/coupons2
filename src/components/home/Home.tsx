import { Component } from 'react'
import "./Home.css";

export default class Home extends Component<any> {

    public constructor(props: any) {
        super(props);
    }

    private ourCoupons = () => {
        this.props.history.push('/coupons');
    }

    private login = () => {
        this.props.history.push('/login');
    }

    public render() {
        return (
            <div className="home">
                <h1>Welcome to coupons website</h1>
                <br />
                <br /><input type="button" value="Our coupons" onClick={this.ourCoupons} />
                <br /><br />
                <br /><input type="button" value="Login / Register" onClick={this.login} />
            </div>
        );
    }
}
