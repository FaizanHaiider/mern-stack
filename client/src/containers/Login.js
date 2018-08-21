import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Container } from "semantic-ui-react";

import { loginUser } from "../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if user is already auth, goto Home
    if (this.props.auth.isAuth) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuth) {
      this.props.history.push("/home");
    }
    // if wrong login info, update ui to show it
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // dispatch login action
    this.props.loginUser(userData);
  }

  onChange(e) {
    // update state with inputs
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <Container textAlign="center">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="username"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              name="password"
              value={this.state.value}
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
