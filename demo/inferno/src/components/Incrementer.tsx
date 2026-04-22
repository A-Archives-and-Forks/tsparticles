import { Component } from 'inferno';
import { addOne } from '../utils/math';
import { Visualizer } from './Visualizer';

import './Incrementer.scss';

interface Props {
  name: string;
}

interface State {
  value: number;
}

export class Incrementer extends Component<Props, State> {
  constructor(props: Props) {
    super(props as any);

    this.state = { value: 1 };

    this.doMath = this.doMath.bind(this);
  }

  doMath() {
    this.setState(({ value }) => ({ value: addOne(value) }));
  }

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <div>
        {name}
        <button className="my-button" onClick={this.doMath}>
          Increment
        </button>
        <Visualizer value={value} />
      </div>
    );
  }
}
