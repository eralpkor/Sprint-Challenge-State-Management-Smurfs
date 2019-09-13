import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getSmurfs, postSmurfs } from "../actions/";

const SmurfsList = ({ getSmurfs, smurfs, isFetching, error }) => {
  const [Smurf, setSmurf] = useState({});

  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  // const SmurfsList = props => {
  //   // get some Smurfs
  //   const fetchSmurf = e => {
  //     e.preventDefault();
  //     props.getSmurfs();
  //   };

  const handleChange = e => {
    setSmurf({
      ...Smurf,
      [e.target.name]:
        e.target.type === "number" ? +e.target.value : e.target.value
    });
    console.log(Smurf);
  };

  const handleSubmit = e => {
    e.target.reset();
    const newSmurf = {
      ...Smurf,
      age: Smurf.age,
      id: smurfs[smurfs.length - 1].id + 1
    };
    axios.post("http://localhost:3333/smurfs", newSmurf);
  };

  const deleteEm = id => {
    axios.delete(`http://localhost:3333/smurfs/${id}`);
  };

  if (isFetching) {
    return <h1>Getting some smurfs...</h1>;
  }

  return (
    <div>
      <div className="add-form">
        <form onSubmit={e => handleSubmit(e)}>
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
          <div key={smurf.id} className="smurf-card">
            <h3>Name: {smurf.name}</h3>
            <p>Age: {smurf.age}</p>
            <p>Height: {smurf.height}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          deleteEm(smurfs.id);
          window.location.reload();
        }}
      >
        Delete Smurf!
      </button>
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
