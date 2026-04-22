import { useState } from '@tsparticles/inferno';
import { addOne } from '../utils/math';
import { Visualizer } from './Visualizer';

import './Incrementer.scss';

interface Props {
  name: string;
}

export function Incrementer({ name }: Props) {
  const [value, setValue] = useState(1);

  const doMath = () => setValue((v) => addOne(v));

  return (
    <div>
      {name}
      <button className="my-button" onClick={doMath}>
        Increment
      </button>
      <Visualizer value={value + 'THIS SHOULD FAIL ( npm run check )!'} />
    </div>
  );
}
