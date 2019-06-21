import React from 'react';
import PropTypes from 'prop-types';

import PhoneNumberGenerator from './components/PhoneNumberGenerator/PhoneNumberGenerator';
import withWindowDimensions from './components/hoc/withWindowDimension';
import WindowsDimensionContext from './components/contexts/WindowsDimensionContext';
import './App.scss';

function App({ windowHeight, windowWidth, isMobileSized }) {
  return (
    <WindowsDimensionContext.Provider value={{ windowHeight, windowWidth, isMobileSized }}>
      <div className="App">
        <PhoneNumberGenerator/>
      </div>
    </WindowsDimensionContext.Provider>
  );
}

App.proTypes = {
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  isMobileSized: PropTypes.bool,
}

export default withWindowDimensions(App);
