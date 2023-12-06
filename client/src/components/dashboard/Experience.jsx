import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
function Experience(props) {
  const deleteExperience = (id) => {
    props.deleteExperience(id);
  };

  const experience = props.experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Present"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h4 className="mb4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </div>
  );
}

export default connect(null, { deleteExperience })(Experience);
