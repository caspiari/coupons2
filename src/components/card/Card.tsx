import { Component } from 'react';

interface ICardProps {
    id : number;
    name : string;
    amount ?: number;
    price ?: number;
}

export default class Card extends Component<ICardProps> {

    public constructor(props: ICardProps) {
        super(props);
    }

    public render() {
        return (
            <div className = "card">
            {`ID: ${this.props.id}`}
            <br/>
            {`Name: ${this.props.name}`}
            <br/>
            {`Amount: ${this.props.amount}`}
            <br/>
            {`Price: ${this.props.price}`}
            </div>
        )
    }
}

