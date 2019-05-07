import React, { Component } from 'react';
import TableRow from './TableRow';
import axios from 'axios';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { blog: [] };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/blog/all')
            .then(res => {
                this.setState({ blog: res.data });
            })
            .catch(err => {
                console.log(err)
            });
    }
    tabRow() {
        return this.state.blog.map(function (obj, i) {
            return <TableRow obj={obj} key={i} />
        });
    }
    render() {
        return (
            <div>
                <h4 align="center"></h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Description</th>
                            <td colSpan="2">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}