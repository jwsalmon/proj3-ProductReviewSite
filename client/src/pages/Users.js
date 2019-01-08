import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Users extends Component {
    state = {
        users: [],
        username: "",
        password: "",
        token: ""
    }
    componentDidMount() {
        this.loadUsers();
      }
    loadUsers = () => {
        API.getUsers()
        .then ( res =>
            this.setState({users: res.data, username:""})
        )
        .catch(err => console.log(err));
    }

    handleLogin = () => {
        API.loginUser()
        .then ( res =>
            this.setState)
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    render(){
        return(
            <Container fluid>
              <Row>
                <Col size="md-6">
                <form>
                    <Input
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="Username"
                    placeholder="Username (required)"
                    />
                    <Input
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="Password"
                    placeholder="Password (required)"
                    />
                    <FormBtn
                    disabled={!(this.state.username && this.state.password)}
                    onClick={this.handleLogin}
                    >
                    Login
                    </FormBtn>
                </form>
                  
                </Col>
              </Row>
            </Container>
        )
    }

}

export default Users;