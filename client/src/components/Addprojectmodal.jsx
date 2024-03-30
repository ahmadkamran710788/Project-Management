import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GetClient } from "../Queries/clientQueries";
import { ADD_PROJECT_MUTATION } from "../mutation/projectMutation";
import { Get_Projects } from "../Queries/projectQueries";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NEW");
  const [clientId, setClientId] = useState("");
  const { loading, error, data } = useQuery(GetClient);
  const [addProject] = useMutation(ADD_PROJECT_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status, clientId);
    if (name === "" || description === "" || clientId === "") {
      return alert("please fill in all fields");
    }

    addProject({
      variables: { name, description, status, clientId },
      update(cache, { data: { addProject } }) {
        const { projects } = cache.readQuery({ query: Get_Projects });
        cache.writeQuery({
          query: Get_Projects,
          data: { projects: [...projects, addProject] },
        });
      },
    });
    setName("");
    setDescription("");
    setStatus("NEW");
    setClientId("");
  };

  if (loading) return null;
  if (error) return <p>Error </p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            tabIndex="-1"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="NEW">Not Started</option>
                        <option value="PROGRESS">In progress</option>
                        <option value="COMPLETED">completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">ClientID</label>
                      <select
                        name=""
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select client</option>
                        {data.clients.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
