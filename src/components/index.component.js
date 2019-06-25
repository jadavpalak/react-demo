import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import myConstClass from '../environment';
import Card from 'react-bootstrap/Card';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalSize: 100,
            page: 1,
            sizePerPage: 5,
        };
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        axios.get(myConstClass.URL + 'all', {
            params: {
                page: page,
                limit: sizePerPage
            }
        }).then(data => {
            this.setState({
                items: data.data.items,
                totalSize: data.data.total,
                page,
                sizePerPage
            });
        });
    }
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage);
    }

    handleSizePerPageChange(sizePerPage) {
        this.fetchData(1, sizePerPage);
    }
    onDelete() {

    }
    onClickProductSelected(cell, row, rowIndex) {

    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button
                type="button"
                onClick={
                    () => this.onClickProductSelected(cell, row, rowIndex)
                }>
                edit
            </button>
        )
    }
    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            sizePerPage: this.state.sizePerPage,
            alwaysShowAllBtns: true,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: '15', value: 15
            }, {
                text: '20', value: 20
            }],
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next',
            paginationShowsTotal: true,
        };
        return (
            <Card>
                <Card.Header><Card.Title>All blog</Card.Title></Card.Header>
                <Card.Body>
                    <BootstrapTable
                        version='4'
                        data={this.state.items}
                        options={options}
                        fetchInfo={{ dataTotalSize: this.state.totalSize }}
                        striped
                        loading={true}
                        hover
                        search
                        remote={true}
                        pagination={true}
                        search={true}>
                        <TableHeaderColumn isKey dataField='name' dataSort={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='description' dataSort={true}>Description</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField="button" dataFormat={this.cellButton.bind(this)}>Buttons</TableHeaderColumn> */}
                    </BootstrapTable>
                </Card.Body>
            </Card>
        )
    }
}