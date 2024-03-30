import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Get_Project } from "../Queries/projectQueries";
import { UPDATE_PROJECT_MUTATION } from "../mutation/projectMutation";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");
  const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("please fill in all fields");
    }
    console.log(1);

    updateProject({
      variables: { id: project.id, name, description, status },
      refetchQueries: [{ query: Get_Project, variables: { id: project.id } }],
    });
  };

  return (
    <div className="mt-5">
      <h3>Update Detail</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            style={{ width: "400px" }} // Adjust the width as needed
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            style={{ width: "400px" }} // Adjust the width as needed
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            style={{ width: "400px" }} // Adjust the width as needed
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NEW">Not Started</option>
            <option value="PROGRESS">In progress</option>
            <option value="COMPLETED">completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
