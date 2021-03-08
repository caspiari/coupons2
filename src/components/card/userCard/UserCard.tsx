import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../models/User';

interface ICardProps {
  user: User;
  selectedUser: any;
  onUserSelect: any;
}

export default class Card extends Component<ICardProps> {

  public constructor(props: ICardProps) {
    super(props);
  }

  public render() {
    return (
        <div className="card">
          <h4><input type="radio" checked={this.props.selectedUser === this.props.user} onChange={this.props.onUserSelect}>
                        {this.props.user.username}</input>
                    </h4>
        </div>
    )
  }
}

