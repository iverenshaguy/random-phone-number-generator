import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

describe('Modal', () => {
  const props = {
    onPageChange: jest.fn(),
    metadata: {
      page: 1,
      perPage: 10,
      totalCount: 450,
    }
  };
  const wrapper = mount(
    <Modal {...props} />, {
      context: {
        windowWidth: 1000,
        windowHeight: 1500,
        isMobileSized: false,
      },
      childContextTypes: {
        windowWidth: PropTypes.number,
        windowHeight: PropTypes.number,
        isMobileSized: PropTypes.bool,
      }
    }
  );

  it('should render Modal component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
