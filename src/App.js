import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import CreateExercises from "./components/CreateExercises";
import CreateUser from "./components/CreateUser";
import EditExercise from "./components/EditExercise";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercises} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
