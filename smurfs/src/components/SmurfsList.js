import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SmurfCard from "./SmurfCard";

import { getSmurfs, postSmurfs } from "../actions/";

const SmurfsList = ({ getSmurfs, smurfs, isFetching, error }) => {
  const [Smurf, setSmurf] = useState({});

  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  const handleChange = e => {
    setSmurf({
      ...Smurf,
      [e.target.name]:
        e.target.type === "number" ? +e.target.value : e.target.value
    });
    console.log(Smurf);
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    const newSmurf = {
      ...Smurf,
      age: Smurf.age
    };
    axios.post("http://localhost:3333/smurfs", newSmurf);
  };

  if (isFetching) {
    return <h1>Getting some smurfs...</h1>;
  }

  return (
    <div>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={Smurf.name}
              onChange={e => handleChange(e)}
            />
          </label>
          <label>
            Height:
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={Smurf.height}
              onChange={e => handleChange(e)}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={Smurf.age}
              onChange={e => handleChange(e)}
            />
          </label>
          <button>Submit Smurf</button>
        </form>
      </div>

      <div className="smurf-wrap">
        {smurfs.map(smurf => (
          <SmurfCard key={smurf.id} smurf={smurf} />
        ))}
        {/* {smurfs.map(smurf => (
          <div key={smurf.id} className="smurf-card">
            <h3>Name: {smurf.name}</h3>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
            <button onClick={deleteEm}>Delete Smurf!</button>
          </div>
        ))} */}
      </div>

      <button onClick={getSmurfs}>Get Smurf!</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getSmurfs, postSmurfs }
)(SmurfsList);
