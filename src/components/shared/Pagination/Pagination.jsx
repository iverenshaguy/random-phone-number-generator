import React, { Component } from 'react';
import ReactPagination from "react-js-pagination";
import PropTypes from 'prop-types';

import WindowsDimensionContext from '../../../contexts/WindowsDimensionContext';
import './Pagination.scss';


class Pagination extends Component {
  static contextType = WindowsDimensionContext;

  static propTypes = {
    onPageChange: PropTypes.func.isRequired,
    metadata: PropTypes.shape({
      page: PropTypes.number,
      perPage: PropTypes.number,
      totalCount: PropTypes.number,
    }),
  };

  state = {
    pages: [],
    currentPage: 1,
    lastPage: 1
  };

  static getDerivedStateFromProps(props) {
    const { metadata: {
      totalCount, page, perPage,
    } } = props;
    const numberOfPages = Math.ceil(totalCount/perPage);
    const pages = Array.from({ length: numberOfPages }, (v, i) => i + 1);

    return {
      pages,
      currentPage: page,
      lastPage: pages[pages.length - 1]
    };
  }

  setPage(page) {
    this.props.onPageChange(page);
  }

  render() {
    const { onPageChange, metadata: { perPage, page, totalCount } } = this.props;
    const { isMobileSized } = this.context;
    const { pages } = this.state;
    const classes = `mx-auto ${pages.length <= 1 ? 'invisible' : 'visible'}`;
    const pageRangeDisplayed = isMobileSized ? 5 : 10;

    return (
      <div className={classes}>
        <ReactPagination
          activePage={page}
          itemsCountPerPage={perPage}
          totalItemsCount={totalCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={onPageChange}
          itemClass="page-item"
        />
      </div>
    );
  }
}

export default Pagination;
