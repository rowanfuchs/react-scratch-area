import React from 'react';
import { render } from 'react-dom';

import ScratchArea from '../../src';
import canvasImage from './1.png';
import resultImage from './result.png';

const settings = {
  width: 192,
  height: 192,
  canvas: canvasImage,
  finishPercent: 80,
  onComplete: () => console.log('The area is now clear!')
};

const Example = () =>
  <ScratchArea {...settings}>
    <img alt="scratch area result" src={resultImage} style={{maxWidth: '12rem'}}/>
  </ScratchArea>;

render(<Example />, document.getElementById('root'));
