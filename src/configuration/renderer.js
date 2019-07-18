import React from 'react';
import {render} from 'react-native-testing-library';
import {Provider} from 'react-redux';
import store from '../store';

const customRender = (children, options = {}) =>
  render(<Provider store={store}>{children}</Provider>, options);

export * from 'react-native-testing-library';

export {customRender as render};
