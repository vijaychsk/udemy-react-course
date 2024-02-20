import React, { Component } from 'react';
import axios from 'axios'

import { Loading } from './Loading';

class App extends Component {
	constructor(props) {
		super(props)
		// state
		this.state = {
			users: [],
			loading: false
		};

        // bind
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    getUsers() {
        this.setState({
            loading: true
        })
		axios('https://api.randomuser.me/?nat=US&results=5').then(response => 
            this.setState({
				users: [...this.state.users, ...response.data.results],
                loading: false
            })
        );
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.getUsers();
        console.log('more users loaded');
    }

	// comes with react. used for API calls before the component mount
	UNSAFE_componentWillMount() {
        this.getUsers();
    }
		
	render() {
        const {loading, users} = this.state
		return (
            <div className="App"> 
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="load users" />
                </form>
                <hr />
                {!loading ? users.map(user => (
		            <div>
			            <h3> {user.name.first} {user.name.last} </h3>
                        <p>  {user.email} </p>
                        <p>  {user.phone} </p>
		                <hr/>
                    </div>
                ))
		        : <Loading message="hey hey hey" />}
		    </div>
        );
	}
}
export default App; 
