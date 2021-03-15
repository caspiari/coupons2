import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Company } from '../../../../models/Company';
import { UserType } from '../../../../models/enums/UserType';
import { store } from '../../../../redux/store';
import "../UpdateUser.css";

interface IIfAdminProps {
  userTypes: UserType[];
  companies: Company[];
  userType: UserType;
  companyId: number;
  setUserType: any;
  setCompanyId: any;
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
      <div className="update">
         <label htmlFor="userType">User type:</label>
        <select name="user type select" id="userType" onChange={this.props.setUserType}>
          <option defaultValue={this.props.userType} key="defaultValue">
            {this.props.userType}
          </option>
          {this.props.userTypes.filter(userType => userType !== this.props.userType).map((userType, index) => (
            <option value={userType} key={index}>{userType.valueOf()}</option>))}
        </select>
        {store.getState().isCompany && <div><label htmlFor="company">Company:</label>
          <select name="company select" id="company" onChange={this.props.setCompanyId}>
            <option defaultValue={this.props.companyId == null? 0 : this.props.companyId} key="default company">
            {this.props.companyId == null? '-- Select company --' : this.props.companies.find(company => company.id === this.props.companyId).name}
            </option>
            {this.props.companies.map((company, index) => (<option value={company.id} key={index}>{company.name}</option>))}
          </select>
        </div>}
      </div>
    );
  }
}