
import React from 'react';
import Tilt from 'react-parallax-tilt';
import './ParallaxEffect.css';

const ParallaxEffect = () => (
  <Tilt className="background-stripes parallax-effect" perspective={500}>
    <div className="inner-element">
      
    </div>
  </Tilt>
);

export default ParallaxEffect;
