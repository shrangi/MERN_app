import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => {
  return (
    <tr>
      <td>{props.exercise.username} </td>
      <td>{props.exercise.description} </td>
      <td>{props.exercise.duration} </td>
      <td>{props.exercise.date.substring(0, 10)} </td>
      <td>
        <Link to={"/edit/" + props.exercise._id}> edit </Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };
  }

  deleteExercise = id => {
    Axios.delete("http://localhost:7000/exercises/" + id).then(res =>
      console.log(res.data)
    );

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  };

  exerciseList = () => {
    return this.state.exercises.map(ex => {
      return (
        <Exercise
          exercise={ex}
          deleteExercise={this.deleteExercise}
          key={ex._id}
        />
      );
    });
  };

  componentDidMount() {
    Axios.get("http://localhost:7000/exercises/")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <h3>Exercises List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th> Username</th>
              <th> Description</th>
              <th> Duration</th>
              <th>Date</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
