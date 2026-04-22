import './Visualizer.css';

/*
 * This is example of Inferno functional component
 * Functional components provide great performance but does not have state
 */

import { Component } from 'inferno';

interface VisualizerProps {
  value: number;
}

export class Visualizer extends Component<VisualizerProps> {
  render() {
    return <div className="visualizer">{this.props.value}</div>;
  }
}
