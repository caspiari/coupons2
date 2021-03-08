import { Component } from 'react';
import { User } from '../../../models/User';

interface ICardProps {
  user: User;
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
      <div className="userCard">
        <b>Id: </b>{this.props.user.id}
        <br />
        <b>{this.props.user.username}</b>
        <br />
        <b>Name: </b>{this.props.user.firstName} {this.props.user.lastName}
        <br />
        <b>Type: </b>{this.props.user.userType}
        <br />
        <b>{this.props.user.companyId != null && `Company id: ${this.props.user.companyId}`}</b>
        <br />
      </div>
    )
  }
}

