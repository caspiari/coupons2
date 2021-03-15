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
        // if(err.message != null && err.message.includes("status code 600")){
        //     Home.loginRequset(props);
        //     return;
        // }
        if (err.response != null && err.response.data != null && err.response.data.errorMessage != null) {
            let errorMessage: string = err.response.data.errorMessage;
            alert(errorMessage.includes("General error") ? "General error, please try again" : (errorMessage.includes("You have no access") ? "You have no access to this action" : errorMessage));
        } else {
            console.log(JSON.stringify(err), err.message);
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
