import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post('http://localhost:4000/blog/add', obj)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            description: ''
        })
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h4>Add new blog</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Blog email:</label>
                        <input type="email" className="form-control-sm" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Blog Name: </label>
                        <input type="text" className="form-control-sm" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Blog Description: </label>
                        <textarea className="form-control-sm" value={this.state.description} onChange={this.onChangeDescription}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Blog" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}