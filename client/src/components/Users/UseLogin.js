import React, { Component } from 'react';
import API from '../../utils/API';

class UsersLogin extends Component {
    state = {
      username: '',
      password: '',
      token: ''
    }

    saveToken = () => {


    };

    handleLogin = (event) => {
      event.preventDefault();
      API.loginUser({
        username: this.state.username,
        password: this.state.password

      })
        .then(res => this.setState({ token: res.data.token }))
        .catch(err => console.log(err));
    };

    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    render() {
      const { username, password } = this.state;
      return (
        <div className="col s4">
          <div>
            <div>User Login</div>
            <form>
              <input
                value={username}
                onChange={this.handleInputChange}
                name="username"
                type="text"
                className="form-control"
                placeholder="username (required)"
              />
              <input
                value={password}
                onChange={this.handleInputChange}
                name="password"
                type="password"
                className="form-control"
                placeholder="password (required"
              />
              <button
                type="button"
                disabled={!(username) && !(password)}
                onClick={this.handleLogin}
              >
              Login
              </button>
            </form>
          </div>
        </div>
      );
    }
}

export default UsersLogin;
