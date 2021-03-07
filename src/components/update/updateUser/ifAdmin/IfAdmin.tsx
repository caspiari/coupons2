import { Component } from 'react'
import { Unsubscribe } from 'redux';
import { Company } from '../../../../models/Company';
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
    this.state = { companies: [] };
  }

  private unsubscribeStore: Unsubscribe;
  private companyName;

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(
      () => this.setState({})
    );
    this.companyName = this.props.companies.filter(company => company.id === this.props.companyId)[0].name;
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="update">
        User type:&nbsp;&nbsp;
        <select name="userTypeSelect" onChange={this.props.setUserType}>
          <option defaultValue={this.props.userType} key="defaultValue">
            {this.props.userType.valueOf()}
          </option>
          {this.props.userTypes.filter(userType => userType !== this.props.userType).map((userType, index) => (<option value={userType} key={index}>{userType.valueOf()}</option>))}
        </select>
        {store.getState().isCompany && <div>
          Company:&nbsp;<select name="Company select" onChange={this.props.setCompanyId}>
            <option defaultValue={this.props.companyId} key="default company">
              {this.companyName}
            </option>
            {this.props.companies.filter(company => company.name !== this.companyName).map((company, index) => (
              <option value={company.id} key={index}>
                {company.name}
              </option>))}
          </select>
        </div>}
      </div>
    );
  }
}