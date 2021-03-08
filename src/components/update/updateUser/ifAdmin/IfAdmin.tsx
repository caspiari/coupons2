import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Company } from '../../../../models/Company';
import { User } from '../../../../models/User';
import { UserType } from '../../../../models/UserType';
import { store } from '../../../../redux/store';
import "../../Update.css";

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

  public constructor(props: any) {
    super(props);
    this.state = {};
  }

  private unsubscribeStore: Unsubscribe;

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
        User type:&nbsp;&nbsp;
        <select name="user type select" onChange={this.props.setUserType}>
          <option defaultValue={this.props.userType} key="defaultValue">
            {this.props.userType}
          </option>
          {this.props.userTypes.filter(userType => userType !== this.props.userType).map((userType, index) => 
            (<option value={userType} key={index}>{userType}</option>))}
        </select>
        {store.getState().isCompany && <div>
          Company:&nbsp;<select name="company select" onChange={this.props.setCompanyId}>
            <option defaultValue={this.props.companyId} key="default company">
              {this.props.companies.find(company => company.id === this.props.companyId)}
            </option>
            {this.props.companies.filter(company => company.id !== this.props.companyId).map((company, index) => (
              <option value={company.id} key={index}>{company.name}</option>))}
          </select>
        </div>}
      </div>
    );
  }
}