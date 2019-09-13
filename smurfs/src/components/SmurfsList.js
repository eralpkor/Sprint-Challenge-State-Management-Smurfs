import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getSmurfs, postSmurfs } from "../actions/";

const SmurfsList = ({ getSmurfs, smurfs, isFetching, error }) => {
  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  // const SmurfsList = props => {
  //   // get some Smurfs
  //   const fetchSmurf = e => {
  //     e.preventDefault();
  //     props.getSmurfs();
  //   };

  const [newSmurf, setNewSmurf] = useState({});

  const handleChanges = evt => {
    setNewSmurf({ ...newSmurf, [evt.target.name]: evt.target.value });
    console.log(newSmurf);
  };

  const handleSubmit = evt => {
    evt.target.reset();
    const newSmurfToAdd = {
      ...newSmurf
    };
    axios.post("http://localhost:3333/smurfs", newSmurfToAdd);
  };

  useEffect(() => {
    getSmurfs();
  }, [getSmurfs]);

  if (isFetching) {
    return <h3>Getting some smurfs...</h3>;
  }

  return (
    <div>
      {smurfs.map(smurf => (
        <div className="smurf-card">
          <h3 key={smurf.id}>{smurf.name}</h3>
          <h4>{smurf.age}</h4>
          <h4>{smurf.height}</h4>
        </div>
      ))}
      {/* <h1>{smurfs}</h1> */}
      <button onClick={getSmurfs}>Fetch Smurf!</button>
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
  { getSmurfs }
)(SmurfsList);
