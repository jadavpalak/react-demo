import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import myConstClass from '../environment';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            name: '',
            description: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            description: this.state.description
        }
        axios.post(myConstClass.URL+'add', obj)
            .then(res => {
                this.props.history.push('/index');
            });

        this.setState({
            name: '',
            email: '',
            description: ''
        })
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <Card>
                    <Card.Header><Card.Title>Add new blog</Card.Title></Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group row">
                                        <label>Blog email:</label>
                                        <input type="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail} 
                                            required/>
                                    </div>
                                    <div className="form-group row">
                                        <label>Blog Name: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onChangeName} 
                                            required/>
                                    </div>
                                    <div className="form-group row">
                                        <label>Blog Description: </label>
                                        <textarea
                                            className="form-control"
                                            value={this.state.description}
                                            onChange={this.onChangeDescription}
                                            required>
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Create Blog" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}