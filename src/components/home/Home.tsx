import { Component } from 'react'
import "./Home.css";

export default class Home extends Component<any> {

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="home">
                <h1>Welcome to coupons website</h1>
                <br />
                <br /><input type="button" value="My details" onClick={this.props.history.push('/coupons')} />
                <br /><br />
                <br /><input type="button" value="Login / Register" onClick={this.props.history.push('/login')} />
            </div>
        );
    }
}
