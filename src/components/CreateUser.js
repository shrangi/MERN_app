import React, { Component } from "react";
import axios from "axios";
class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  onchangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    axios
      .post("http://localhost:7000/users/add", user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.setState({ username: "" });
  };

  render() {
    return (
      <div className="container">
        <h3> Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onchangeUsername}
            />
          </div>

          <div className="form-group">
            <button onSubmit={this.onSubmit}>Create User </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
