import React, {Component} from 'react';
import ListOfRepos from './List';
import UserInfo from './UserInfo';

import '../static/css/style.css'
import axios from 'axios';

const github_api = 'https://api.github.com';

class App extends Component {

    state = {
        repos: [],
        userInfo: []
    };

    getRepos = (username) => {
        return axios.get(`${github_api}/users/${username}/repos?sort=updated`);
    };

    getInfo = (username) => {
        return axios.get(`${github_api}/users/${username}`);
    };

    searcUserInfo = async (username) => {
        try {
            const response = await this.getInfo(username);
            console.log(response.data);

            this.setState({
                userInfo: response.data
            });
        } catch (err) {
            console.log(err);
            alert('User 404');

            this.setState({userInfo: []});

        }
    };

    searchUserRepos = async (username) => {
        try {
            const response = await this.getRepos(username);

            this.setState({
                repos: response.data
            });
        } catch (err) {
            console.log(err);

            this.setState({repos: []});
        }
    };

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="search_block input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input id="search_repo" type="text" className="form-control" placeholder="username"
                               aria-label="username" aria-describedby="button-addon2"
                               onKeyDown={(e) => {
                                   if (e.keyCode === 13) {
                                       const search_val = $('#search_repo').val();

                                       if (search_val) {
                                           this.searcUserInfo(search_val);
                                           this.searchUserRepos(search_val);
                                       }
                                   }
                               }}/>
                    </div>
                </div>
                <UserInfo userInfo={this.state.userInfo}/>
                <ListOfRepos reposData={this.state.repos}/>
            </div>
        )
    }
}

export default App;
