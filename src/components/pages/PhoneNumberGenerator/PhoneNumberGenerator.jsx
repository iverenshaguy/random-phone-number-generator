import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import { Button, InputGroup, InputGroupAddon, Input, Table } from 'reactstrap';
import CsvDownloader from 'react-csv-downloader';

import Pagination from '../../shared/Pagination/Pagination';
import Modal from '../../shared/Modal/Modal';
import generateUniqueNumbers from '../../../utils/generateUniqueNumbers';
import sortNumbers from '../../../utils/sortNumbers';

import './PhoneNumberGenerator.scss';


export default class PhoneNumberGenerator extends Component {
  state = {
    count: 1000,
    sort: 'ASC',
    loading: false,
    previousResults: [],
    results: [],
    metadata: {
      page: 1,
      perPage: 10,
      totalCount: 0,
    }
  }

  handlePageChange = (page) => {
    this.setState({
      metadata: {
        ...this.state.metadata,
        page
      }
    });
  }

  handleChange = ({ target: { name, value } }) => {
    const prevSort = this.state.sort;

    this.setState({
      [name]: value
    }, () => {
      const { sort, results } = this.state;

      if (prevSort !== sort && results.length) {
        this.sortNumbers();
      }
    });
  }

  sortNumbers = () => {
    const sorted = sortNumbers(this.state.results, this.state.sort);

    this.updateResults(sorted);
  }

  generateNumbers = () => {
    this.setState({
      loading: true
    }, () => {
      const { previousResults, count, sort } = this.state;
      const results = generateUniqueNumbers(previousResults, count, sort);

      this.updateResults(results);
    });
  }

  updateResults = (results) => {
    this.setState({
      results,
      loading: false,
      previousResults: results,
      metadata: {
        ...this.state.metadata,
        page: 1,
        totalCount: results.length,
      }
    });
  }

  renderDefaultMessage = () => (
    <div className="default-message">
      <p className="px-5">Generate some numbers by supplying count of less than or equal to 10000 and sort of ascending or descending order</p>
    </div>
  );


  renderResult = () => {
    const { results, loading, metadata: { perPage, page } } = this.state;
    const offset = (page - 1) * perPage;
    const resultsToRender = results.slice(offset, offset + perPage);

    if (loading) {
      return (
        <div className="my-auto">
          <Loader type="Ball-Triangle" color="#ced4da" height={80} width={80} />
        </div>
      );
    }


    return (
      <Table className="w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {resultsToRender.map((result, index) => (<tr key={result}>
            <td>{index + offset + 1}</td>
            <td>{result}</td>
          </tr>))}
        </tbody>
      </Table>
    );
  }

  renderModalActionButton= () => {
    const datas = this.state.results.map((number, index) => ({
      id: index + 1,
      number: number.toString()
    }));

    const columns = [{
      id: 'id',
      displayName: 'ID'
    }, {
      id: 'number',
      displayName: 'Numbers'
    }];

    console.log(datas);


    return (
      <CsvDownloader datas={datas} columns={columns} filename="phone-numbers">
        <Button color="secondary" onClick={this.saveResults}>Save Results</Button>
      </CsvDownloader>
    );
  }

  renderModalBody = () => {
    const { sort, results } = this.state;
    const length = results.length;
    const minimum = (!sort || sort === 'ASC') ? results[0] : results[length - 1];
    const maximum = (!sort || sort === 'ASC') ? results[length - 1] : results[0];
    const order = sort === 'ASC' ? 'Ascending' : 'Descending';

    return (
      <dl className="row mx-auto mb-0 px-5">
        <dt className="pl-5 col-sm-4">Order:</dt>
        <dd className="pl-5 col-sm-8">{order}</dd>
        <dt className="pl-5 col-sm-4">Minimum:</dt>
        <dd className="pl-5 col-sm-8">{minimum}</dd>
        <dt className="pl-5 col-sm-4">Maximum:</dt>
        <dd className="pl-5 col-sm-8">{maximum}</dd>
        <dt className="pl-5 col-sm-4">Count:</dt>
        <dd className="pl-5 col-sm-8">{length}</dd>
      </dl>
    );
  }

  render() {
    const { metadata, results, count, sort, loading } = this.state;
    const disableButton = count > 10000 || count < 1;
    const ungenerated = !results.length && !loading;

    return (
      <div className="container-fluid rc-PhoneNumberGenerator mt-5">
        <div className="row justify-content-center main">
          <h4 className="text-center m-3 m-3-md m-5-l">Random Phone Number Generator</h4>
          <div className="d-flex justify-content-between">
            <Input className="w-50 mr-2" type="select" name="sort" value={sort} onChange={this.handleChange}>
              <option>ASC</option>
              <option>DESC</option>
            </Input>
            <InputGroup className="w-100 mb-3">
              <Input type="number" placeholder="Numbers Count" name="count" value={count} onChange={this.handleChange} />
              <InputGroupAddon addonType="append">
                <Button className="w-100" disabled={disableButton} onClick={this.generateNumbers}>Generate</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Modal
            disabled={!results.length}
            title="Results"
            label="View/Save Results"
            actionButton={this.renderModalActionButton()}
          >
            {this.renderModalBody()}
          </Modal>
          <div className="card result-card text-center mb-3 pt-3">
            <div className="card-body d-flex justify-content-center result-content">
              {ungenerated ? this.renderDefaultMessage() : this.renderResult()}
            </div>
          </div>
          <Pagination metadata={metadata} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
