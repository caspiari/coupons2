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

    public static exceptionTreatment = (err: any, props: Readonly<any>) => {
        if(err.message.includes("status code 600")){
            Home.loginRequset(props);
        }
        if (err.response.data != null) {
            let errorMessage: string = err.response.data.errorMessage;
            alert(errorMessage.includes("General error") ? "General error, please try again" : errorMessage);
        } else {
            console.log(JSON.stringify(err))
        }
    }
    
    public static loginRequset = (props: Readonly<any>) => {
        alert("Please login/register to continue");
        props.history.push('/login'); //Can't use this components props in a static function
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
