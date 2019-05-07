import React, { Component } from 'react';
import axios from 'axios';
// import { myConstClass } from '../constant';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            email: '',
            description: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/blog/edit/' + this.props.match.params.id)
            .then(res => {
                console.log(res);
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    description: res.data.description
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onSubmit(e) {
        // e.preventDefault();
        console.log("submit");
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
                        <input type="submit" value="Edit Blog" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}