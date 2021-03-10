import { Component } from 'react'
import "./Home.css";
import { NavLink } from 'react-router-dom';

export default class Home extends Component<any> {

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="home">
                <h1>Welcome to coupons website</h1>
                <br />
                <NavLink to={"/coupons"}>
                    Our coupons
                </NavLink>
                <br /><br />
                <NavLink to={"/login"}>
                    Login / Register
                </NavLink>
            </div>
        );
    }
}
