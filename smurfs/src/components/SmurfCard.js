import React from "react";
import { useDispatch } from "react-redux";

import { deleteSmurf, getSmurfs } from "../actions/";

export default function SmurfCard(props) {
  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteSmurf(props.smurf.id));
    dispatch(getSmurfs());

  };

  return (
    <div className="smurf-card">
      <h3>{props.smurf.name}</h3>
      <h4>Age: {props.smurf.age}</h4>
      <h4>Height: {props.smurf.height}</h4>
      <button onClick={handleDelete}>Delete Smurf!</button>
    </div>
  );
}
