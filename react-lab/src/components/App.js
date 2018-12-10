import React, { Component } from 'react';
// import '../static/css/material.min.css'
import '../static/css/style.css'
import swal from 'sweetalert';
import ListOfRepos from './List';
import axios from 'axios';

const github_api = 'https://api.github.com';

class App extends Component {

    state = {
        repos: []
    };

    getRepos = (username) => {
        return axios.get(`${github_api}/users/${username}/repos?sort=updated`);
    }

    searchUserRepos = async (username) => {
        try {
            const response = await this.getRepos(username);

            this.setState({
                repos: response.data
            });
        } catch (err) {
            console.log(err);
            let statusCode = 500;
            let message = null;

            this.setState({ repos: [] });

            if (err.response) {
                statusCode = err.response.status;
                console.log(statusCode);
            }

            switch (statusCode) {
                case 404:
                    message = 'User not found';
                    break;
                default:
                    message = 'Something gone wrong. Try again later';
                    break;
            }
            swal("Error", message, "error");
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input id="search_repo" type="text" className="form-control" placeholder="username" aria-label="username" aria-describedby="button-addon2" />
                        <div class="input-group-append">
                            <button onClick={() => this.searchUserRepos($('#search_repo').val())}
                                className="btn btn-outline-info"
                                type="button" id="button-addon2">Искать</button>
                        </div>
                    </div>
                </div>
                <ListOfRepos reposData={this.state.repos} />
            </div>
        )
    }
}

export default App;
