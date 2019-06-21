import React from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';


describe('Pagination', () => {
  const props = {
    onPageChange: jest.fn(),
    metadata: {
      page: 1,
      perPage: 10,
      totalCount: 450,
    }
  };
  const wrapper = mount(
    <Pagination {...props} />, {
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

  it('should render Pagination component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls setPage when a pagination item is clicked', () => {
    wrapper.find('a:first-child').at(7).simulate('click');
    expect(props.onPageChange).toHaveBeenCalled();
  });
});
