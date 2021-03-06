import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton   } from 'react-bootstrap-table';
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
            sortName: 'name',
            sortOrder: 'desc',
            search:'',
        };
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    onSortChange(sortName, sortOrder) {
        this.setState({
            sortName:sortName,
            sortOrder:sortOrder
        });
        this.fetchData(1, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.search);
      }
    componentDidMount() {
        this.fetchData();
    }
    fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage, sortName = this.state.sortName, sortOrder = this.state.sortOrder, search = this.state.search) {
        axios.get(myConstClass.URL + 'all', {
            params: {
                page: page,
                limit: sizePerPage,
                sortName:sortName,
                sortOrder:sortOrder,
                search: this.state.search
            }
        }).then(data => {
            this.setState({
                items: data.data.items,
                totalSize: data.data.total,
                page,
                sizePerPage,
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
    handleInsertButtonClick = (onClick) => {
        this.props.history.push('/create');
      }
      handleDeleteButtonClick= (onClick)=>{
          
      }
    createCustomInsertButton = (onClick) => {
        return (
          <InsertButton
            btnText='CustomInsertText'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleInsertButtonClick(onClick) }/>
        );
      }
      createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='CustomDeleteText'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
      }
    onFilterChange(filterObj) {
        this.setState({
            search: filterObj,
        });
        this.fetchData(1, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, this.state.search);
    }
    render() {
        const options = {
            sortIndicator: true,
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.state.page,
            onFilterChange: this.onFilterChange,
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
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };
        return (
            <Card>
                <Card.Header><Card.Title>All blog</Card.Title></Card.Header>
                <Card.Body>
                <p style={ { color: 'red' } }>sort: sortName={ this.state.sortName }, sortOrder={ this.state.sortOrder }</p>
                    <BootstrapTable
                        version='4'
                        remote={true}
                        data={this.state.items}
                        options={options}
                        fetchInfo={{ dataTotalSize: this.state.totalSize }}
                        striped
                        loading={true}
                        hover
                        pagination
                        >
                        <TableHeaderColumn isKey ref='nameCol' dataField='name' dataSort filter={{ type: 'TextFilter' }}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' dataSort filter={{ type: 'TextFilter' }}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='description' dataSort filter={{ type: 'TextFilter' }}>Description</TableHeaderColumn>
                    </BootstrapTable>
                </Card.Body>
            </Card>
        )
    }
}