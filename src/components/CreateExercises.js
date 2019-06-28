import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
class CreateExercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: "",
      date: new Date(),
      users: []
    };
  }

  onchangeUsername = e => {
    this.setState({ username: e.target.value });
  };
  onchangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  onchangeDuration = e => {
    this.setState({ duration: e.target.value });
  };
  onchangeDate = date => {
    this.setState({ date: date });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);
    axios
      .post("http://localhost:7000/exercises/add", exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = "/";
  };

  //life cycle methods
  componentDidMount() {
    axios.get("http://localhost:7000/users/").then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data[0].username
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Create New Exercise Log</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onchangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label name=""> Description:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.onchangeDescription}
              value={this.state.description}
            />
          </div>

          <div className="form-group">
            <label name=""> Duration:</label>
            <input
              type="NUMBER"
              required
              className="form-control"
              onChange={this.onchangeDuration}
              value={this.state.duration}
            />
          </div>

          <div className="form-group">
            <label name=""> Date:</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onchangeDate}
            />
          </div>

          <button className="btn btn-primary" onSubmit={this.onSubmit}>
            Create Exercise Log
          </button>
        </form>
      </div>
    );
  }
}

export default CreateExercises;
