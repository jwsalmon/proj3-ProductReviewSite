import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
//import { Input, TextArea, FormBtn } from "../components/Form";

class Users extends Component {
    state = {
        users: [],
        username: ""
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

    render(){
        return(
            <Container fluid>
              <Row>
                <Col size="md-6 sm-12">
                  <h1>List of Users</h1>
                  {this.state.users.length ? (
                    <List>
                        {this.state.users.map(user => (
                        <ListItem key={user._id}>
                            <Link to={"/users/" + user._id}>
                            <strong>
                                {user.username}
                            </strong>
                            </Link>
                        </ListItem>
                        ))}
                    </List>
                    ) : (
                    <h3>No Results to Display</h3>
                    )}
                </Col>
              </Row>
            </Container>
        )
    }

}

export default Users;