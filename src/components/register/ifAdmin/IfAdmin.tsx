import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Company } from '../../../models/Company';
import { UserType } from '../../../models/UserType';
import { store } from '../../../redux/store';
import "../Register.css";

interface IIfAdminProps {
  userTypes: UserType[];
  setUserType: any;
  setCompanyId: any;
  companies: Company[];
}

interface IIfAdminState {
}

export default class IfAdmin extends Component<IIfAdminProps, IIfAdminState> {

  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState({})
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="register">
        User type:&nbsp;&nbsp;
        <select name="user type select" onChange={this.props.setUserType}>
          <option defaultValue={UserType.CUSTOMER} key="defaultUserType">
            -- Select user type --
            </option>
          {this.props.userTypes.map((userType, index) => (
            <option value={userType} key={index}>{userType.valueOf()}</option>))}
        </select>
        {store.getState().isCompany && <div>Company:&nbsp;
          <select name="company select" onChange={this.props.setCompanyId}>
            <option defaultValue="0" key="default company">
              -- Select company --
            </option>
            {this.props.companies.map((Company, index) => (<option value={Company.id} key={index}>{Company.name}</option>))}
          </select>
        </div>}
      </div>
    );
  }
}