# react-scratch-area

A react component for displaying scratch area in your web app.

## Installation

```
$ npm install react-scratch-area
```

## Example

```javascript
import React from 'react';
import ScratchArea from 'react-scratch-area';
import canvasImage from './1.png';

const settings = {
  width: 192,
  height: 192,
  canvas: canvasImage, //i.e #396, rgba(255,255,255,.3) or a image
  finishPercent: 80,
  onComplete: () => console.log('The area is now clear!')
};

const Example = () =>
  <ScratchArea {...settings}>
    Congratulations! You WON!
  </ScratchArea>;
```

## Credits

André Ruffert
Aleksi Kaistinen
Jinke Li
