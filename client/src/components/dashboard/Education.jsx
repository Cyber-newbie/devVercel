import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
function Education(props) {
  const deleteEducation = (id) => {
    props.deleteEducation(id);
  };
  const education = props.education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Present"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h4 className="mb4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </div>
  );
}

export default connect(null, { deleteEducation })(Education);
