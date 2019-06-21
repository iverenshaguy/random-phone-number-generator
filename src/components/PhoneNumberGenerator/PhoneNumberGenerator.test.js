import React from 'react';
import PropTypes from 'prop-types';

import PhoneNumberGenerator from './PhoneNumberGenerator';

describe('PhoneNumberGenerator', () => {
  const props = {
    onPageChange: jest.fn(),
    metadata: {
      page: 1,
      perPage: 10,
      totalCount: 450,
    }
  };
  const wrapper = mount(
    <PhoneNumberGenerator {...props} />, {
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

  it('should render PhoneNumberGenerator component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle input box change', () => {
    expect(wrapper.find('input[name="count"]').instance().value).toEqual("1000");

    wrapper.find('input[name="count"]').simulate('change', { target: { name: 'count', value: 2000 } });
    expect(wrapper.find('input[name="count"]').instance().value).toEqual("2000");
  });

  it('should handle select box change', () => {
    expect(wrapper.find('select[name="sort"]').instance().value).toEqual('ASC');

    wrapper.find('select[name="sort"]').simulate('change', { target: { name: 'sort', value: 'DESC' } });
    expect(wrapper.find('select[name="sort"]').instance().value).toEqual("DESC");
  });

  it('should generate unique numbers and hide default message on generate button click', () => {
    expect(wrapper.find('.default-message').length).toEqual(1);
    wrapper.find('.input-group-append button').simulate('click');

    expect(wrapper.find('.default-message').length).toEqual(0);
  });

  it('should sort generated numbers on when select button is changed', () => {
    const sortNumbersSpy = jest.spyOn(wrapper.instance(), 'sortNumbers');
    wrapper.find('select[name="sort"]').simulate('change', { target: { name: 'sort', value: 'ASC' } });

    expect(sortNumbersSpy).toHaveBeenCalled();
  });

  it('should change page in state when a pagination item is clicked', () => {
    expect(wrapper.state().metadata.page).toEqual(1);
    wrapper.find('.page-item a').at(4).simulate('click');

    expect(wrapper.state().metadata.page).toEqual(3);
  });
});